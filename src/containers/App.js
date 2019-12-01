import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
  

//initializig the particles
const particleOptions = {
    "particles": {
        "number": {
            "value": 200
        },
        "size": {
            "value": 2
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}

//initializing the state.
const initstate = {
        input: '',
        imageURL: '',
        box:{},
        route: 'signin',
        issignedIn: false,
        user:{
            id: '',
            email: '',
            name: '',
            entries: 0,
            joined: ''
    }
}

//defining the App
class App extends Component {
    constructor(){
        super();
        this.state = initstate;
    }

    calculateFaceBox = (data) => {
        const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('img');
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: faceBox.left_col * width,
            topRow: faceBox.top_row * height,
            rightCol: width - (faceBox.right_col * width),
            bottomRow: height - (faceBox.bottom_row * height)
        }
    }

    displayfaceBox = (boxnumber) => {
        this.setState({box: boxnumber})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonClick = () => {
        this.setState({imageURL: this.state.input})
        fetch('https://stark-woodland-64889.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input,
            })
        }).then(response => response.json())
        .then(response => {
            //if we get response from clarified, update the rank(entries)
            if(response){
                fetch('https://stark-woodland-64889.herokuapp.com/rank', {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                      id: this.state.user.id,
                    })
                }).then(response => response.json())
                .then(entries => {
                    if(entries){
                        this.setState(Object.assign(this.state.user, {entries: entries}))
                    }
                })
            }
            this.displayfaceBox(this.calculateFaceBox(response))
        }).catch(err => console.log(err));
    }

    loadUsers = (data) =>{
        this.setState({ user:{
            id: data.id,
            email: data.email,
            name: data.name,
            entries: data.entries,
            joined: data.joined,
            }
        });
    }

    onRoutechange = (route) =>{
        if(route === 'signin'){
            this.setState(initstate);
        }else if(route === 'home'){
            this.setState({issignedIn: true})
        }
        this.setState({route: route})
    }

    render() {
        const { imageURL, box, route, issignedIn} = this.state;
      return(
        <div className='App'>
            <Particles className='Particle'
                params = { particleOptions }
            />
            <Navigation 
                name = {this.state.user.name}
                changeRoute = { this.onRoutechange }
                issignedIn = { issignedIn }
            />
            <Logo/>
            {
                route === 'home'
                ?<>
                    <Rank name = { this.state.user.name} 
                    entries={ this.state.user.entries } 
                    />

                    <ImageLinkForm 
                        onInputChange = {this.onInputChange}
                        onButtonClick = {this.onButtonClick}/>
                    <FaceRecognition
                        image = {imageURL}
                        box = {box}/>
                </>
                :(
                    route === 'signin'
                    ?   <Signin loadUsers = { this.loadUsers } onsignin = { this.onRoutechange } />
                    :   <Register loadUsers = { this.loadUsers } onsignup = { this.onRoutechange }/>   
                 )
            }
        </div>
      )
    }
  }
  
  export default App;
  
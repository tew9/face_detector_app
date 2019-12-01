import React, { Component } from 'react';

class Signin extends Component {
  constructor(props){
    super(props)
    this.state = {
                signEmail: '',
                signinPass: '',
                message: ''
              }
  }

  onEmailchange = (event) =>{
    this.setState({signEmail: event.target.value})
  }

  onPasschange = (event) =>{
    this.setState({ signinPass: event.target.value })
  }

  onEnter = (e) =>{
    if(e.key === 'Enter'){
      e.preventDefault()
      this.onsubmit()
    }
  }

  onsubmit = ()=>{
     fetch('https://stark-woodland-64889.herokuapp.com/login', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signEmail,
        password: this.state.signinPass
      }),
    }).then(Response => Response.json())
    .then(user =>{
      if(user.id){
        this.props.loadUsers(user)
        this.props.onsignin('home')
      }else{
        this.setState({message: "Incorrect Username or Password"})
      }
    }).catch(err => {
      this.setState({message: "please access the website another time"})
    });
  }
  
  render(){
    
    const { onsignin } = this.props;
     return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-1 center ">
        <main className="pa4 black-80">
          <div className="measure">
            
            <fieldset id="sign_up" className="ba b--transparent ph0 white mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className = 'mt3'>{ this.state.message } </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 "
                type="email" 
                name="email-address" 
                placeholder = {this.state.signEmail} 
                id="email-address"
                onChange = {this.onEmailchange}
                 />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange = {this.onPasschange}
                />
              </div>
            </fieldset>
            <div className="">
              <input onClick = {this.onsubmit} 
                onKeyPress = { this.onEnter }
                className="b ph3 pv2 input-reset ba b--yellow white bg-transparent grow pointer f5 dib grow" 
                type="submit" 
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" onClick = {() => onsignin('register') } className="f5 link black db grow">Sign up</a>
            </div>
          </div>
        </main>
      </article>
  );
  }
 
}

export default Signin;
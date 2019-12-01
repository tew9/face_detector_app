import React, { Component } from 'react';

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      registeration_status: '',
    }
  }

  onEmailchange = (event) =>{
    this.setState({email: event.target.value})
  }

  onPasschange = (event) =>{
    this.setState({ password: event.target.value })
  }

  onNameChange = (event) =>{
    this.setState({ name: event.target.value })
  }

  onRegister = () => {
    
    fetch('https://stark-woodland-64889.herokuapp.com/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    }).then(Response => Response.json())
    .then(user =>{
      if(user.id){
        this.props.loadUsers(user)
        this.props.onsignup('signin')
      }else{
        this.setState({registeration_status: "User was not succesfully Registered"})
        console.log("Cannot load the users")
      }
    });
  }

  render(){
    return (
      <article className="br ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw7 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div>{this.state.registeration_status}</div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " 
                type="text" 
                name="first-name"  
                id="firstname"
                onChange = { this.onNameChange }
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange = { this.onEmailchange }
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="password" 
                 name="password" 
                 id="password"
                 onChange = { this.onPasschange }
                 />
              </div>
            </fieldset>
            <div className="">
              <input onClick = { this.onRegister } 
              className="b ph3 pv2 input-reset ba white b--black bg-transparent grow pointer f5 dib grow" 
              type="submit" 
              value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
  
}

export default Register;
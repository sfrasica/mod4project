import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
// import Home from './components/Home'
import ProfileContainer from './ProfileComponents/ProfileContainer'
import './App.css';

import {withRouter} from 'react-router-dom'
//takes a boring component wrapped in it and returns a 'fun' component

 class App extends React.Component {

  state={
    user: {
      id: 0,
      username: ""
    }
  }
  

  handleLoginSubmit = (userInfo) => {
    console.log("Login has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then((resp) =>{
        
      this.setState({
          user: resp
        }, () => {
          this.props.history.push("/profile")
        })
      })
  }

  handleRegisterSubmit = (userInfo) => {
    // console.log("Register Form has been submitted")
    // console.log(userInfo)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(resp => resp.json())
    .then(registeredUser => {
      this.setState({
        user: registeredUser
      })
    })
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer user={this.state.user}/>
  }










  render(){
    console.log(this.state.user, "User Object")
    console.log(this.props, "App props")
    return (
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          {/* <Route path="/" exact render={() => <Home /> } /> */}
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)
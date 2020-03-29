import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
import DigimonContainer from './components/DigimonContainer'
import ProfileContainer from './ProfileComponents/ProfileContainer'
import './App.css';

import {withRouter} from 'react-router-dom'
//takes a boring component wrapped in it and returns a 'fun' component

 class App extends React.Component {

  state= {
    user: {
      username: "",
      userDigimons: []
    },
    token: "",
    digimons: []
  }
  

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/persist",{
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(this.handleResp)
    }

    fetch("http://localhost:3000/digimons")
    .then(resp => resp.json())
    .then(digimonsArray => {
        this.setState({
            digimons: digimonsArray
        })
    })
  }

  handleResp = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token
      this.setState(resp , () => {
          this.props.history.push("/digimons")
        })
      } 
      else {
        alert(resp.error)
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
    .then(this.handleResp)
  }

  handleRegisterSubmit = (userInfo) => {
    // console.log("Register Form has been submitted")
    // console.log(userInfo)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then(this.handleResp)
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  // renderProfile = (routerProps) => {
  //   return <ProfileContainer user={this.state.user} token={this.state.token}/>
  // }

  addDigimonToTeam = (DigimonObj) => {
    console.log(DigimonObj)

    fetch("http://localhost:3000/user_digimons", {
      method: "POST",
      headers: {
          "content-type": "application/json",
          "Authorization": `bearer ${this.state.token}`
      },
      body: JSON.stringify({
          digimon: DigimonObj
      })
  })
  .then(resp => resp.json())
  .then(digiObj => {
    console.log(digiObj)
    // let updatedArray = [digiObj, ...this.state.user.userDigimons]
    //         this.setState({...this.state,
    //                user: {
    //                  ...this.user.state, 
    //                  userDigimons: updatedArray
    //                }  
    //               }
    //         )
  })
  }










  render(){
    console.log(this.state.user, "APP")
    console.log(this.state.user.user_digimons)
    console.log(this.state.token)
    return (
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/digimons">
            <DigimonContainer
              addDigimonToTeam = {this.addDigimonToTeam}
              digimons = {this.state.digimons}
              // userDigimons = {this.state.user.user_digimons}
              user = {this.state.user}
              userDigimons = {this.state.user.user_digimons}
              token = {this.state.token}
            />
          </Route>
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)
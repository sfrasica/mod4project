import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
import DigimonContainer from './components/DigimonContainer'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import {withRouter} from 'react-router-dom'
//takes a boring component wrapped in it and returns a 'fun' component

 class App extends React.Component {

  state= {
    user: {
      username: "",
      user_digimons: []
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
          this.props.history.push("/")
        })
      } 
      else {
        alert(resp.error)
      }
  }

  handleLoginSubmit = (userInfo) => {
    // console.log("Login has been submitted")

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
          "Authorization": `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
            digimon_id: DigimonObj.id
      })
  })
  .then(resp => resp.json())
  .then(digiObj => {
    console.log(digiObj)
    let updatedArray = [digiObj, ...this.state.user.user_digimons]
            this.setState({
                   user: { ...this.state.user,
                    user_digimons: updatedArray}  
                  }
            )
  })

  }

  deleteDigimonFromTeam = (id) => {
     
        fetch(`http://localhost:3000/user_digimons/${id}`, {
            method: "DELETE",
            headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${this.state.token}`
            }
             })  
            .then(resp => resp.json())
            .then(() => {
                let updatedArray = this.state.user.user_digimons.filter(digimon => {
                    return digimon.id !== id
                })
                this.setState({
                  user: { ...this.state.user,
                   user_digimons: updatedArray}  
                 })
            })
          }


    updateDigimon = (id, statsIncrease) => {
      let foundObject = this.state.user.user_digimons.find(userDigimonObj => userDigimonObj.id === id)
      console.log(foundObject.digimon.stats)
      fetch(`http://localhost:4000/user_digimons/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          digimon: {...foundObject.digimon, stats: foundObject.digimon.stats + statsIncrease}
          
        })
      })
      .then(r => r.json())
      .then(() => {
        let updatedArray = this.state.user.user_digimons.map((userDigimonObj) => {
          if (userDigimonObj.id === id) {
            return {
              ...userDigimonObj,
              stats: userDigimonObj.digimon.stats + statsIncrease
            }
          } else {
            return userDigimonObj
          }
        })
  
        this.setState({
          user: { ...this.state.user,
           user_digimons: updatedArray}  
         })
      })
    }
  








  render(){
    // console.log(this.state.user, "APP")
    console.log(this.state.user.user_digimons)
    // console.log(this.state.token)
    return (
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/digimons">
            <DigimonContainer className="App-body"
              addDigimonToTeam = {this.addDigimonToTeam}
              digimons = {this.state.digimons}
              userDigimons = {this.state.user.user_digimons}
              user = {this.state.user}
              token = {this.state.token}
              deleteDigimonFromTeam = {this.deleteDigimonFromTeam}
              updateDigimon = {this.updateDigimon}
            />
          </Route>
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)
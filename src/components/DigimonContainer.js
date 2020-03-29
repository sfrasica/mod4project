import React, { Component } from 'react'
import DigimonList from './DigimonList.jsx'
import Search from './Search.jsx'

import TeamContainer from './TeamContainer'
  
  
export default class DigimonContainer extends Component {

    state= {
        digimons: [],
        searchTerm: ""
    }


    changeSearchTerm = (term) => {
        
        this.setState({
            searchTerm: term
        })
    }

    returnFilteredDigimon = () => {
        let filteredDigimon = this.props.digimons.filter(digimon => {
            return digimon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || digimon.level.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })
        return filteredDigimon
    }

    
        
    // }
    // addDigimonToTeam = (DigimonObj) => {
    //     console.log(DigimonObj)
    
    //     fetch("http://localhost:3000/user_digimons", {
    //       method: "POST",
    //       headers: {
    //           "content-type": "application/json",
    //           "Authorization": `Bearer ${this.props.token}`
    //       },
    //       body: JSON.stringify({
    //             digimon_id: DigimonObj.id
    //       })
    //   })
    //   .then(resp => resp.json())
    //   .then(digiObj => {
    //     console.log(digiObj)
    //     let updatedArray = [this.props.user.digimons]
    //             this.setState({...this.state,
    //                     digimons: updatedArray  
                      
    //             })
    //   })
    //   }


    
    
    //Send addDigimonToTeam down to digimonList as props and then down to digimon card 

    //UserDigimon is displaying the digimon attached to it?  
    //It's showing the digimon I just added to team
    //create the userdigimon relaitionship based off id in the backend
    //
    //in render json in create controller action in userdigimon? put user_digimon.digimon

    render() {
        console.log(this.props.user.user_digimons)
        return (
            
            <div>
                <div>
                    <h2>Welcome to DigiLand, {this.props.user.username}</h2>
                </div>
         
                <br/>
                <Search searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/> 
                <br/>
                <DigimonList digimons={this.returnFilteredDigimon()} deleteOneDigimon={this.deleteOneDigimon} addDigimonToTeam={this.props.addDigimonToTeam} user={this.props.user} token={this.props.token}/>
                <TeamContainer digimons={this.props.user.user_digimons} user={this.props.user} token={this.props.token} deleteDigimonFromTeam={this.props.deleteDigimonFromTeam} />
            </div>
        )
    }
}
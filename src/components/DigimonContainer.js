import React, { Component } from 'react'
import DigimonList from './DigimonList.jsx'
import Search from './Search.jsx'
import AddDigimonForm from './AddDigimonForm.jsx'
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

    // deleteOneDigimon = (id) => {
        
    //     fetch(`http://localhost:3000/digimons/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //         "content-type": "application/json",
    //         "Authorization": `bearer ${this.props.token}`
    //         }
    //          })  
    //         .then(resp => resp.json())
    //         .then(() => {
    //             let updatedArray = this.props.digimons.filter(digimon => {
    //                 return digimon.id !== id
    //             })
    //             this.setState({
    //                 digimons: updatedArray
    //             })
    //         })
        
    // }


    
    
    //Send addDigimonToTeam down to digimonList as props and then down to digimon card 

    //UserDigimon is displaying the digimon attached to it?  
    //It's showing the digimon I just added to team
    //create the userdigimon relaitionship based off id in the backend
    //
    //in render json in create controller action in userdigimon? put user_digimon.digimon

    render() {
        console.log(this.state.digimons)
        console.log(this.props.userDigimons)

        return (
            
            <div>
                <div>
                    <h2>Welcome to DigiLand, {this.props.user.username}</h2>
                </div>
                <AddDigimonForm addDigimon={this.addDigimon} />
                <br/>
                <Search searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/> 
                <br/>
                <DigimonList digimons={this.returnFilteredDigimon()} deleteOneDigimon={this.deleteOneDigimon} addDigimonToTeam={this.props.addDigimonToTeam} user={this.props.user} token={this.props.token}/>
                <TeamContainer digimons={this.state.digimons} userDigimons={this.props.userDigimons} user={this.props.user} token={this.props.token} />
            </div>
        )
    }
}
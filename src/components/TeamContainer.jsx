import React, { Component } from 'react'
import TeamDigimonCard from './TeamDigimonCard'

export default class TeamContainer extends Component {
    

teamArray = () => {
        let listOfDigimon = this.props.digimons.map(digimonObj => {
                //  return digimonObj.digimon.name
            let {id, digimon} = digimonObj
            return <TeamDigimonCard
                        key ={id}
                        id = {id}
                        digimon={digimon}
                        deleteDigimonFromTeam={this.props.deleteDigimonFromTeam}
                        updateDigimon = {this.props.updateDigimon}
                        token={this.props.token}  
                    />
                    })
            return listOfDigimon
        }
    
render() {
        console.log(this.props.digimons)
     return (
            <div className="ui grid container">
                <h3>{this.props.user.username}'s Team</h3>
                 {this.teamArray()}  
            </div>
        )
    }
}

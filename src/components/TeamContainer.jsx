import React, { Component } from 'react'
import DigimonCard from './DigimonCard'
export default class TeamContainer extends Component {
    
teamArray = () => {
    let firstArray = this.props.user.user_digimons
    let listOfDigimon = firstArray.map((userDigimonObj) => {
        return <li><DigimonCard
                    key ={userDigimonObj.id}
                    digimon={userDigimonObj.digimon}
                    deleteOneDigimon={this.props.deleteOneDigimon}
                    addDigimonToTeam={this.props.addDigimonToTeam}
                    user={this.props.user}
                    token={this.props.token}
                    />
                </li>
    })
        return listOfDigimon
    }
    render() {
        
       
        // console.log(this.props.user)
        // console.log(this.props.token)
        // console.log(this.props.user.user_digimons)
        console.log(this.teamArray())
        return (
            <div>
                Team
               <ul>
                 {this.teamArray()}  
               </ul>
            </div>
        )
    }
}

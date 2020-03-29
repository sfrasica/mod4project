import React, { Component } from 'react'
import TeamDigimonCard from './TeamDigimonCard'
export default class TeamContainer extends Component {
    
// teamArray = () => {
//     let listOfDigimon = this.props.digimons.map(digimonObj => {
//             // console.log(digimonObj.name)
        
//         return <DigimonCard
//                     key ={digimonObj.id}
//                     digimon={digimonObj}
//                     deleteOneDigimon={this.props.deleteOneDigimon}
                   
//                     user={this.props.user}
//                     token={this.props.token}
                    
//                 />
                
//     })
//         return listOfDigimon
//     }

teamArray = () => {
        let listOfDigimon = this.props.digimons.map(digimonObj => {
                //  return digimonObj.digimon.name
            let {id, digimon} = digimonObj
            return <TeamDigimonCard
                        key ={id}
                        id = {id}
                        digimon={digimon}
                        deleteDigimonFromTeam={this.props.deleteDigimonFromTeam}
                        // user={user}
                        token={this.props.token}
                        
                    />
                    
        })
            return listOfDigimon
        }
    


    render() {
        
    //    console.log(this.props.user.user_digimons)
        console.log(this.props.digimons)
        // console.log(this.props.token)
        // console.log(this.props.user.user_digimons)
        
        return (
            <div className="ui grid container">
                Team
               
                 {this.teamArray()}  
              
            </div>
        )
    }
}

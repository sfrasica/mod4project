import React, { Component } from 'react'

export default class TeamDigimonCard extends Component {


    state = {
        clicked: false
    }

    handleClick = (e) => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    handleDelete = (e) => {
        this.props.deleteDigimonFromTeam(this.props.id)
    }

    handleAddDigimonToTeam = (e) => {
        
        const digimonObj = this.props.digimon
        // console.log(digimonObj)
        // console.log(this.props.token)
        this.props.addDigimonToTeam(digimonObj)
     
    

    }

    handleUpdateDigimon = (e) => {
        let statChange = Math.random() < .5 ? 10 : -15
        console.log(statChange)
        this.props.updateDigimon(this.props.id, statChange)
    }

    render() {
        let {name, img, level, stats} = this.props.digimon
        return (
            <div>
                
                <div className="four wide column rendered-example views-card-types-card-example-card"></div>
                <div className="ui card" style ={{opacity: 0.8}}>
                <div className="image"><img src={img} alt={name}/></div>
                <div className="meta"  ><span style ={{opacity: 1.0}}>{name}</span></div>
                <div className="meta" ><span>Level: {level}</span></div>
                <div className="meta" ><button  className="ui black basic button" onClick={this.handleClick}>Show DigiDetails</button>
                    {this.state.clicked ?
                    <div className="meta"><span>{name}'s  stats: {stats} will go here</span></div>
                    
                    :

                    null
                    
                     }
                
                </div>
                <div><button className="ui black basic button" onClick={this.handleDelete}>Remove Digimon From Team</button></div>
                <div><button className="ui black basic button" onClick={this.handleUpdateDigimon}>Update digimon stats</button></div>
                </div>
            </div>
        )
    }
}
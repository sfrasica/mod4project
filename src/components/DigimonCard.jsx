import React, { Component } from 'react'

export default class DigimonCard extends Component {


    state = {
        clicked: false
    }

    handleClick = (e) => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    handleDelete = (e) => {
        this.props.deleteOneDigimon(this.props.digimon.id)
    }

    handleAddDigimonToTeam = (e) => {
        
        const digimonObj = this.props.digimon
        // console.log(digimonObj)
        // console.log(this.props.token)
        this.props.addDigimonToTeam(digimonObj)
     
    

    }

    render() {
        let {name, img, level} = this.props.digimon
        return (
            <div>
                
                <div className="four wide column rendered-example views-card-types-card-example-card" style={{opacity: 0.8}}>
               
                <div className="image"><img src={img} alt={name} /></div>
                <div className="ui label"  >{name}</div>
                <div className="meta" ><span className="ui label">Level: {level}</span></div>
                <div className="meta" ><button  className="ui red inverted button" onClick={this.handleClick}>Show DigiDetails</button>
                    {this.state.clicked ?
                    <div className="meta"><span>{name}'s  details will go here</span></div>
                    
                    :

                    null
                    
                     }
                
                </div>
                    
                <button className="ui red inverted button" onClick={this.handleAddDigimonToTeam}>Add {name} to your Team</button>
                  
                </div>
            </div>
        )
    }
}
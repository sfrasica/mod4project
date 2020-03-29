import React, { Component } from 'react'



export default class AddDigimonForm extends Component {

    state = {
        name: "",
        img: "",
        level: ""
    }

//e for free
    handleAllInput = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addDigimon(this.state)

        this.setState({
            name: '',
            img: '',
            level: ''
        })
    }

  
    render() {
        console.log(this.state.name)
        return (
            <React.Fragment>
            <h2>Create New Digimon</h2>
            <form onSubmit={this.handleSubmit}>
            <label for="name"><h3>Name:</h3> </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleAllInput}/>
            <label for="img"><h3>Img URL:</h3> </label>
            <input type="text" name="img" value={this.state.img} onChange={this.handleAllInput}/>
            <label>
            <h3>Level:</h3>
            <select value={this.state.level} name="level" onChange={this.handleAllInput}>
            <option value="In-Training">In-Training</option>
            <option value="Rookie">Rookie</option>
            <option value="Champion">Champion</option>
            <option value="Ultimate">Ultimate</option>
            <option value="Mega">Mega</option>
          </select>
            </label>
            <input type="submit"/>
          </form>
          </React.Fragment>
        )
    }
}

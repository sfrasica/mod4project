import React from 'react'
import DigimonCard from './DigimonCard.jsx'
export default function DigimonList(props) {

    let listOfDigimon = props.digimons.map((digimon) => {
        return <DigimonCard
                    key ={digimon.id}
                    digimon={digimon}
                    deleteOneDigimon={props.deleteOneDigimon}
                    addDigimonToTeam={props.addDigimonToTeam}
                    user={props.user}
                    token={props.token}
                    />
    })

    return (
        <div className="ui grid container">
            {listOfDigimon}
        </div>
    )
}

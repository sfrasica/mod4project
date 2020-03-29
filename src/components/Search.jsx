import React from 'react'

export default function Search(props) {


    const handleChange = (e) => {
        props.changeSearchTerm(e.target.value)
    }
    
    return (
        <div>
            <input type="text" placeholder="search name or level" value={props.searchTerm} onChange={handleChange}></input>
        </div>
    )
}

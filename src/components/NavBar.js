import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return(
    <div className="ui menu">
       <a href class="item"><NavLink to="/login">Login</NavLink></a>
       <a href class="item"><NavLink to="/register">Register</NavLink></a> 
       <a href class="item"><NavLink to="/digimons">Digimons</NavLink></a>
    </div>
  )
};

export default NavBar;
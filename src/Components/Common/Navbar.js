import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export class Navbar extends Component {
    render() {
        return (            
            <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">HRManager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <NavLink to={"/"} className="nav-link">
                        Home
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/admin"} className="nav-link">
                        Admin
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/scheduler"} className="nav-link">
                        Scheduler
                    </NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Worktime</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                    </li>
                    </ul>
                    <div className="d-flex">
                        <span className="text-white">Logged in: {this.props.loggedInUser.username}</span>
                    </div>
                </div>
            </nav>
       </div>
        )
    }
}

export default Navbar

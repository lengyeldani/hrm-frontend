import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export class Navbar extends Component {
    render() {
        return (            
            <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">HRManager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <NavLink to={"/"} className="nav-link">
                        Otthon
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/admin"} className="nav-link">
                        Adminisztrátor
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/vacation"} className="nav-link">
                        Szabadságok
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/vacation/manager"} className="nav-link">
                        Kezelő
                    </NavLink>
                    </li>                                   
                    </ul>
                    <div className="d-flex">
                        <span className="text-white">
                        {this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName} |
                        </span>
                        <span className="text-white ml-2">
                        {this.props.loggedInUser.username}</span>
                    </div>
                </div>
            </nav>
       </div>
        )
    }
}

export default Navbar

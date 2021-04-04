import React, { Component } from 'react'
import {getUsers} from '../../Services/UserService'

export class Admin extends Component {

    componentDidMount = () => {
       getUsers()
       .then(response=>response.json)
       .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <h3>Admin Page</h3>
            </div>
        )
    }
}

export default Admin

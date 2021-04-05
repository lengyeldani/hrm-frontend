import React, { Component } from 'react'
import {getUsers} from '../../Services/UserService'
import UserTableRows from './UserTableRows';
import ReactLoader from 'react-loader-spinner'
import { NavLink } from 'react-router-dom';

export class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            links:{},
            dataLoaded:false,
            
        }
    }

    componentDidMount = () => {
      this.getAllUser()
    }

    getAllUser = () => {
        getUsers()
        .then(response => response.json())
        .then(data => this.setState(data))
        .finally(()=> this.setState({dataLoaded:true}))
    }

    renderTable = () => {
        if (this.state.dataLoaded) {
            return(
                <UserTableRows
                    getAllUser={this.getAllUser}
                    data={this.state.data}
                />
            )
        }
        else{
            return(
                <tr>
                    <td className="text-center" colSpan="5">
                        <ReactLoader type="ThreeDots" color="#888888" height="50" width="50"/>
                    </td>
                </tr>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>Admin Page</h3>
                
                <NavLink to={"/admin/addUser"} className="btn btn-primary mb-2">
                      Add new user
                </NavLink>
               
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>username</th>
                            <th>role</th>
                            <th>department</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>date of birth</th>
                            <th>zip code</th>
                            <th>address</th>
                            <th>mother's fname</th>
                            <th>mother's lname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Admin

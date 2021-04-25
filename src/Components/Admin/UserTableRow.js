import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {deleteUser} from '../../Services/UserService'

export class UserTableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.user.id,
            username:this.props.user.username,
            role:this.props.user.role_id
        }
    }

    handleDelete = () => {
        deleteUser(this.props.user.id)
        .then(response=> {
            if(response.ok){
                toast.success('Felhasználó törölve!')
            }
            else{
                toast.warning('Felhasználó törlése sikertelen.')
            }
        })
        this.props.getAllUser()
    }
 
    render() {        
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.role.name}</td>
                <td>{this.props.user.department.name}</td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.dateOfBirth}</td>
                <td>{this.props.user.zipCode}</td>
                <td>{this.props.user.address}</td>
                <td>{this.props.user.mothersFirstName}</td>
                <td>{this.props.user.mothersLastName}</td>
                <td>{this.props.user.vacationCounter.max}</td>
                <td>{this.props.user.vacationCounter.used}</td>
                <td>                    
                    <NavLink to={{
                        pathname:"/admin/edit/" + this.props.user.id,
                        user:this.props.user                        
                        }}  
                        className="btn btn-primary btn-sm">
                        Módosítás
                    </NavLink>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Törlés</button>
                </td>
            </tr>
        )
    }
}

export default UserTableRow

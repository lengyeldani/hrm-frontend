import React, { Component } from 'react'

export class UserTableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.user.id,
            username:this.props.user.username,
            role:this.props.user.role_id
        }
    }
    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.role_id}</td>
                <td>{this.props.user.department_id}</td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.dateOfBirth}</td>
                <td>{this.props.user.zipCode}</td>
                <td>{this.props.user.address}</td>
                <td>{this.props.user.mothersFirstName}</td>
                <td>{this.props.user.mothersLastName}</td>
            </tr>
        )
    }
}

export default UserTableRow

import React, { Component } from 'react'

export class UserRoleOptions extends Component {
    render() {
        return (
            this.props.roles.map((role)=>(                
                <option value={role.id} key={role.id}>{role.name}</option>
            ))
        )
    }
}

export default UserRoleOptions

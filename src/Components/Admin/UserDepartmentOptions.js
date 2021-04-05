import React, { Component } from 'react'

export class UserDepartmentOptions extends Component {
    render() {
        return (
            this.props.departments.map((department)=>(                
                <option value={department.id} key={department.id}>{department.name}</option>
            ))
        )
    }
}

export default UserDepartmentOptions

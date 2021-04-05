import React, { Component } from 'react'
import UserTableRow from './UserTableRow'

export class UserTableRows extends Component {
    render() {
        return (
            this.props.data.map((u) => (
                <UserTableRow
                getAllUser={this.props.getAllUser}
                key={u.id}
                user={u}
                />
            ))
        )
    }
}

export default UserTableRows

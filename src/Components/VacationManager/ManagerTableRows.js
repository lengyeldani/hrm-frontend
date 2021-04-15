import React, { Component } from 'react'
import ManagerTableRow from './ManagerTableRow'

export class ManagerTableRows extends Component {
    render() {
        return (
            this.props.data.map((e) => (
                <ManagerTableRow
                getAllEmployee={this.props.getAllEmployee}
                key={e.id}
                employee={e}                
                />
            ))
        )
    }
}

export default ManagerTableRows

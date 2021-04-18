import React, { Component } from 'react'
import ManagerEditTableRow from './ManagerEditTableRow'

export class ManagerEditTableRows extends Component {
    render() {
        return (
            this.props.data.map((v) => (
                <ManagerEditTableRow               
                key={v.id}
                vacation={v}
                refreshData={this.props.refreshData}             
                />
            ))
        )
    }
}

export default ManagerEditTableRows

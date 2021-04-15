import React, { Component } from 'react'

export class ManagerTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.employee.id}</td>
                <td>{this.props.employee.username}</td>                           
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>                            
                <td>{this.props.employee.vacationCounter.max}</td> 
                <td>{this.props.employee.vacationCounter.used}</td> 
                <td>{this.props.employee.vacationCounter.remaining}</td>               
            </tr>
        )
    }
}

export default ManagerTableRow

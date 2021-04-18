import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class ManagerTableRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pendingVacations:[]           
        }
    }

    componentDidMount(){
        let pendingArray = this.props.employee.vacations.filter((v) => {
            return (v.vacation_status.id === 1) ? true : false            
        })
       
        this.setState({pendingVacations:pendingArray})
    }

    handleEdit=()=>{             
        this.props.clickedEmployee(this.props.employee)
    }

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
                <td className={this.state.pendingVacations.length > 0 ? "text-danger" : ""}>{this.state.pendingVacations.length}</td>
                <td>
                <NavLink to={{
                        pathname:"/vacation/manager/edit/" + this.props.employee.id,
                        employee:this.props.employee                        
                        }}  
                        className="btn btn-primary btn-sm">
                        Módosítás
                </NavLink>               
                </td>               
            </tr>
        )
    }
}

export default ManagerTableRow

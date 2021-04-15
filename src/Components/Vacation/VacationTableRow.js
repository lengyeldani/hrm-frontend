import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {changeVacationStatus} from '../../Services/VacationService'

export class VacationTableRow extends Component {
   
    handleCancelVacation = () => {
        let data = {            
            'vacationStatus':4
        }

        changeVacationStatus(this.props.vacation.id,data)
        .then(response => {
            if(response.ok){
                toast.success('Vacation request cancelled.');
                this.props.getAllVacation();
            }
            else{
                toast.warning('Cannot cancel vacation request.');
            }
        })
    }

    renderCancelBtn = ()=> {
        if(this.props.vacation.vacation_status.id !==4){
            return(
                <button onClick={this.handleCancelVacation} className="btn btn-warning btn-sm">Cancel</button>
            )
        }
        else{
            return null;
        }
    }

     
    render() {
        return (
            <tr>                
                <td>{this.props.vacation.vacation_status.name}</td>  
                <td>{this.props.vacation.start}</td>     
                <td>{this.props.vacation.end}</td>        
                <td>
                    {this.renderCancelBtn()}
                </td>
            </tr>
        )
    }
}

export default VacationTableRow

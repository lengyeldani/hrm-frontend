import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {cancelVacation} from '../../Services/VacationService'

export class VacationTableRow extends Component {
   
    handleCancelVacation = () => {
        let data = {            
            'vacationStatus':4
        }

        cancelVacation(this.props.vacation.id)
        .then(response => {
            if(response.ok){
                toast.success('Szabadság sikeresen visszavonva.');
                this.props.getAllVacation();
            }
            else{
                toast.warning('Nem sikerült a szabadság visszavonása.');
            }
        })
        .then(this.props.getAllVacation)
    }

    renderCancelBtn = ()=> {
        if(this.props.vacation.vacation_status.id ===1){
            return(
                <button onClick={this.handleCancelVacation} className="btn btn-warning btn-sm">Visszavonás</button>
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

import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {changeVacationStatus} from '../../Services/VacationService'

export class VacationTableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
       
    }

    handleCancelVacation = () => {
        let data = {
            'vacation_id':this.props.vacation.id,
            'status_id':4
        }

        changeVacationStatus(data)
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
                <td>{this.props.vacation.date}</td>            
                <td>
                    {this.renderCancelBtn()}
                </td>
            </tr>
        )
    }
}

export default VacationTableRow

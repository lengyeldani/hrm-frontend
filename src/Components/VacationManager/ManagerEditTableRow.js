import React, { Component } from 'react';
import VacationStatusOptions from './VacationStatusOptions';
import {getVacationStatuses, changeVacationStatus} from '../../Services/VacationService';
import {toast} from 'react-toastify';


export class ManagerEditTableRow extends Component {

    constructor(props) {
        super(props)
        this.state ={           
            dataLoaded:false,
            status:'',
            id:undefined
        }
    }

    componentDidMount(){        
        this.setState({
            id: this.props.id,
            status:this.props.vacation.vacation_status.id
        })        
    }

    handleStatusChange = (e) => {
        this.setState({
            status:e.target.value
        })
        let data = {
            'vacationStatus':e.target.value
        }        
        changeVacationStatus(this.state.id,data)
        .then(response => {
            if(response.status === 200){
                toast.success('Sikeres változtatás a szabadság státuszban.')
            }
            else{
                toast.warning('Sikertelen művelet.')
            }
        })
        .then(this.props.refreshData())
    }

    render() {
        return (
            <tr>         
                <td>{this.props.vacation.vacation_status.name}</td>  
                <td>{this.props.vacation.start}</td>     
                <td>{this.props.vacation.end}</td>        
                <td>
                   <select onChange={e => this.handleStatusChange(e)} value={this.state.status} className="form-control col-3">
                       <VacationStatusOptions vacationStatuses={this.props.vacationStatuses}/>
                   </select>
                </td>
            </tr>
        )
    }
}

export default ManagerEditTableRow

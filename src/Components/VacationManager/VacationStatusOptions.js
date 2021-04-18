import React, { Component } from 'react';


export class VacationStatusOptions extends Component {
   
    render() {
        return (
            this.props.vacationStatuses.map((vacationStatus)=>(                
                <option value={vacationStatus.id} key={vacationStatus.id}>{vacationStatus.name}</option>
            ))
        )
    }
}

export default VacationStatusOptions

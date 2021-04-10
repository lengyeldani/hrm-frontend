import React, { Component } from 'react'
import VacationTableRow from './VacationTableRow'

export class VacationTableRows extends Component {
    render() {
        return (
            this.props.data.map((v) => (
                <VacationTableRow
                getAllVacation={this.props.getAllVacation}
                key={v.id}
                vacation={v}                
                />
            ))
        )
    }
}

export default VacationTableRows

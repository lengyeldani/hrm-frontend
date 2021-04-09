import React, { Component } from 'react'

export class Scheduler extends Component {

    constructor(props){
        super(props);
        
    }


    render() {
        return (
            <div className="form-group col-3">
               <input className="form-control" type="datetime-local"/>
            </div>
        )
    }
}

export default Scheduler

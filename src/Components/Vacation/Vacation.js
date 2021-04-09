import React, { Component } from 'react';
import {addVacation, getVacations, getVacationStatuses} from '../../Services/VacationService';
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import { VacationTableRows } from './VacationTableRows';

export class Vacation extends Component {

    constructor(props){
        super(props);
        this.state= {
            dataLoaded:false,
            date:'',
            vacations:[],
            vacationStatuses:[],
            links:{},
            meta:{},
            per_page:10,
            current_page:1,
            last_page:1
        }
        
    }

    handleRequestVacation = () => {
        let data = {
            'userId': this.props.loggedInUser.id,
            'date':this.state.date
        }
        addVacation(data)
        .then(request => {
            if(request.ok){
                toast.success('Vacation request has been saved.')
            }
            else{
                toast.warning('Couldn\'t save the vacation request.')
            }
        })

        this.getAllVacation(this.state.current_page);
    }

    getAllVacation = (current_page) => {
        getVacations(this.props.loggedInUser.id, current_page)
        .then(response => response.json()
        .then(data => {
            this.setState({
                vacations:data.data,
                dataLoaded:true,
                last_page:data.last_page
            })
        }))
    }

    refreshVacations = () => {
        this.getAllVacation(this.state.current_page)
    }

    renderTable = () => {
        if (this.state.dataLoaded && this.state.vacations.length>0) {
            return(
                <VacationTableRows                    
                    data={this.state.vacations}
                    getAllVacation={this.refreshVacations}
                    vacationStatuses={this.state.vacationStatuses}
                />
            )
        }
        else if(!this.state.dataLoaded){
            return(
                <tr>
                    <td className="text-center" colSpan="5">
                        <ReactLoader type="ThreeDots" color="#888888" height="50" width="50"/>
                    </td>
                </tr>
            )
        }
        else{
            return null;
        }
    }

    componentDidMount(){
        getVacationStatuses()
        .then(response => response.json())
        .then(data => this.setState({vacationStatuses:data}))
        

        this.getAllVacation(this.state.current_page);

        
    }

    handlePageClick = (selectedObject)=> {        
        this.setState({current_page:selectedObject.selected +1})
        this.getAllVacation(selectedObject.selected +1)
    }

    render() {
        return (
            <div>                
                <h3 className="mb-5 mt-2">Vacation</h3>
                <div className="row align-items-end mb-3">
                    <div className="col-3">
                    <label>Date:</label>
                        <input className="form-control" value={this.state.date} onChange={e => this.setState({date:e.target.value})} type="date"/>
                    </div>
                    <div className="col-2 ">
                        <button onClick={this.handleRequestVacation} className="btn btn-primary">Request vacation</button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>status</th>
                            <th>date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    previousClassName={'page-item'}
                    nextLabel={'next'}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}  
                    pageLinkClassName={'page-link'}                 
                    pageCount={this.state.meta.last_page}                   
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    disabledClassName={'disabled'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    
                />
            </div>
        )
    }
}

export default Vacation

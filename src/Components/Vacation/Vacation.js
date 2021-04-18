import React, { Component } from 'react';
import {addVacation, getVacations, getVacationStatuses} from '../../Services/VacationService';
import {getUserById} from '../../Services/UserService';
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import { VacationTableRows } from './VacationTableRows';

export class Vacation extends Component {

    constructor(props){
        super(props);
        this.state= {
            dataLoaded:false,
            start:'',
            end:'',
            vacations:[],            
            links:{},
            meta:{},
            per_page:10,
            current_page:1,
            last_page:1,
            max:'',
            used:'',
            remaining:''
        }
        
    }
   
    refreshUserData = () => {
        getUserById(this.props.loggedInUser.id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                max:data.vacation_counter.max,
                used:data.vacation_counter.used,
                remaining:data.vacation_counter.remaining
            })
        })        
    }

    handleRequestVacation = () => {
        let data = {
            'userId': this.props.loggedInUser.id,
            'start':this.state.start,
            'end':this.state.end,
            'vacationStatus':1
        }
        addVacation(data)
        .then(request => {
            if(request.ok){
                toast.success('Szabadság igénylése sikeres!')
            }
            else if(request.status === 409){
                toast.warning('Már van igényelve szabadság a megadott időszakra!')
            }
            else if(request.status === 400 ){
                toast.warning('Nincs elegendő szabadság az igényléshez a megadott időszakra!')
            }
            else{
                toast.warning('Váratlan hiba történt az igénylés során.')
            }
        })
        .then(() => {
            this.getAllVacation(this.state.current_page)
            this.refreshUserData()
        }
        )        
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
        .then(this.refreshUserData())
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
        this.refreshUserData();
        
    }

    handlePageClick = (selectedObject)=> {        
        this.setState({current_page:selectedObject.selected +1})
        this.getAllVacation(selectedObject.selected +1)
    }

    render() {
        return (
            <div>                
                <h3 className="mb-5 mt-2">Szabadságok</h3>
               
                <div className="row align-items-end p-3 mb-3 border-top border-bottom">
                    <div className="col-4">
                        <label>összes szabadság:</label>
                        <input className="form-control" type="text" value={this.state.max} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>felhasznált szabadság:</label>
                        <input className="form-control" type="text" value={this.state.used} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>maradék szabadság:</label>
                        <input className="form-control" type="text" value={this.state.remaining} readOnly></input>
                    </div>
                </div>
                <div className="row align-items-end mb-3">
                    <div className="col-3">
                    <label>Szabadság kezdete:</label>
                        <input className="form-control" value={this.state.start} onChange={e => this.setState({start:e.target.value})} type="date"/>
                    </div>
                    <div className="col-3">
                    <label>Szabadság vége:</label>
                        <input className="form-control" value={this.state.end} onChange={e => this.setState({end:e.target.value})} type="date"/>
                    </div>
                    <div className="col-2 ">
                        <button onClick={this.handleRequestVacation} className="btn btn-primary">Szabadság igénylése</button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>státusz</th>
                            <th>szabadság kezdete</th>
                            <th>szabadság vége</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'előző'}
                    previousClassName={'page-item'}
                    nextLabel={'következő'}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}  
                    pageLinkClassName={'page-link'}                 
                    pageCount={this.state.last_page}                   
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

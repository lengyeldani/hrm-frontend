import React, { Component } from 'react'
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import ManagerEditTableRows from './ManagerEditTableRows';
import {withRouter} from 'react-router'
import {addVacation,showByUser} from '../../Services/VacationService'
import {getUserById} from '../../Services/UserService'
import {managerVacationStatuses} from '../../Services/VacationService';

export class ManagerEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vacations:[],
            dataLoaded:false,
            username:'',
            firstName:'',
            lastName:'',
            id:'',
            current_page:1,
            last_page:'',
            start:'',
            end:'',
            max:'',
            used:'',
            remaining:'',
            vacationStatuses:[]
        }      
    }

    componentDidMount(){
        managerVacationStatuses()
        .then(response => response.json())
        .then(data => this.setState({vacationStatuses:data}))      
        this.getData(this.state.current_page)        
    }

    

    getData = (current_page) => {
        this.setState({dataLoaded:false})
        const {id} = this.props.match.params;
        showByUser(id, current_page)
        .then(response => response.json())
        .then(data => {
            this.setState({
                vacations:data.data,
                last_page:data.last_page,
                current_page:1             
            })
        })              
        .finally(this.setState({dataLoaded:true})) 

        getUserById(id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                firstName:data.firstName,
                lastName:data.lastName,
                username:data.username,
                id:data.id,
                max:data.vacation_counter.max,
                used:data.vacation_counter.used,
                remaining:data.vacation_counter.remaining
            })
        })
                
    }

    handlePageClick = (selectedObject)=> {        
        this.getData(selectedObject.selected+1)        
        this.setState({current_page:selectedObject+1})
    }

    handleRequestVacation = () => {
        let data = {
            'userId': this.state.id,
            'start':this.state.start,
            'end':this.state.end,
            'vacationStatus':5
        }
        addVacation(data)
        .then(request => {
            if(request.ok){
                toast.success('Az alkamazott szabads??gra k??ld??se sikeres.')
            }
            else{
                toast.warning('Nem siker??lt szabads??gra k??ldeni az alkalmazottat.')
            }
        })

        this.getData(this.state.current_page)
    }

    refreshData = () => {
        this.getData(this.state.current_page)
    }

    renderPaginate = () => {
        if(this.state.dataLoaded && this.state.vacations.length>0){
            return (
                <ReactPaginate 
                                  
                previousLabel={'el??z??'}
                previousClassName={'page-item'}
                nextLabel={'k??vetkez??'}
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
                )
        }
        else return null
    }
    

    renderTable = () => {
        if(this.state.dataLoaded && this.state.vacations.length>0){
            return (
                <ManagerEditTableRows
                vacationStatuses={this.state.vacationStatuses}
                data={this.state.vacations}                
                refreshData={this.refreshData}
                />
                )
            }
        else{
            return(
                <tr>
                    <td className="text-center" colSpan="7">
                        <ReactLoader type="ThreeDots" color="#888888" height="50" width="50"/>
                    </td>
                </tr>
            )
        }        
        
    }

    render() {
        return (
            
            <div>                
                <h3 className="mb-5 mt-2">Alkalmazott szabads??gai</h3>
                <div className="row align-items-end p-3 mb-3 border-top">
                    <div className="col-4">
                        <label>Felhaszn??l??n??v:</label>
                        <input className="form-control" type="text" value={this.state.username} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>Keresztn??v:</label>
                        <input className="form-control" type="text" value={this.state.firstName} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>Vezet??kn??v:</label>
                        <input className="form-control" type="text" value={this.state.lastName} readOnly></input>
                    </div>
                </div>
                <div className="row align-items-end p-3 mb-3 border-bottom">
                    <div className="col-4">
                        <label>??sszes szabads??g:</label>
                        <input className="form-control" type="text" value={this.state.max} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>felhaszn??lt szabads??g:</label>
                        <input className="form-control" type="text" value={this.state.used} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>marad??k szabads??g:</label>
                        <input className="form-control" type="text" value={this.state.remaining} readOnly></input>
                    </div>
                </div>
                <div className="row align-items-end mb-3 p-3">
                    <div className="col-3">
                    <label>Szabads??g kezdete:</label>
                        <input className="form-control" value={this.state.start} onChange={e => this.setState({start:e.target.value})} type="date"/>
                    </div>
                    <div className="col-3">
                    <label>Szabads??g v??ge:</label>
                        <input className="form-control" value={this.state.end} onChange={e => this.setState({end:e.target.value})} type="date"/>
                    </div>
                    <div className="col-2 ">
                        <button onClick={this.handleRequestVacation} className="btn btn-primary">Szabads??gra k??ld??s</button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>st??tusz</th>
                            <th>szabads??g kezdete</th>
                            <th>szabads??g v??ge</th>
                            <th>st??tusz m??dos??t??sa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                {this.renderPaginate()}
            </div>
        )
    }
}

export default ManagerEdit

import React, { Component } from 'react'
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import ManagerEditTableRows from './ManagerEditTableRows';
import {withRouter} from 'react-router'
import {addVacation,showByUser} from '../../Services/VacationService'
import {getUserById} from '../../Services/UserService'

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
            remaining:''
        }      
    }

    componentDidMount(){
        this.getData(this.state.current_page)
    }

    getData = (current_page) => {
        const {id} = this.props.match.params;
        showByUser(id, current_page)
        .then(response => response.json())
        .then(data => {
            this.setState({
                vacations:data.data,
                last_page:data.last_page                
            })
        })        

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
        .then(this.setState({dataLoaded:true}))        
    }

    handlePageClick = (selectedObject)=> {        
        this.getData(selectedObject.selected +1)
        .then(response => response.json())
        .then(data => this.setState({
            users:data.data,
            current_page:selectedObject.selected,
            last_page:data.last_page
        }))
        .finally(this.setState({dataLoaded:true}))
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
                toast.success('Az alkamazott szabadságra küldése sikeres.')
            }
            else{
                toast.warning('Nem sikerült szabadságra küldeni az alkalmazottat.')
            }
        })

        this.getData(this.state.current_page)
    }

    refreshData = () => {
        this.getData(this.state.current_page)
    }
    

    renderTable = () => {
        if(this.state.dataLoaded && this.state.vacations.length>0){
            return (
                <ManagerEditTableRows
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
                <h3 className="mb-5 mt-2">Alkalmazott szabadságai</h3>
                <div className="row align-items-end p-3 mb-3 border-top">
                    <div className="col-4">
                        <label>Felhasználónév:</label>
                        <input className="form-control" type="text" value={this.state.username} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>Keresztnév:</label>
                        <input className="form-control" type="text" value={this.state.firstName} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>Vezetéknév:</label>
                        <input className="form-control" type="text" value={this.state.lastName} readOnly></input>
                    </div>
                </div>
                <div className="row align-items-end p-3 mb-3 border-bottom">
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
                <div className="row align-items-end mb-3 p-3">
                    <div className="col-3">
                    <label>Szabadság kezdete:</label>
                        <input className="form-control" value={this.state.start} onChange={e => this.setState({start:e.target.value})} type="date"/>
                    </div>
                    <div className="col-3">
                    <label>Szabadság vége:</label>
                        <input className="form-control" value={this.state.end} onChange={e => this.setState({end:e.target.value})} type="date"/>
                    </div>
                    <div className="col-2 ">
                        <button onClick={this.handleRequestVacation} className="btn btn-primary">Szabadságra küldés</button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>státusz</th>
                            <th>szabadság kezdete</th>
                            <th>szabadság vége</th>
                            <th>státusz módosítása</th>
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

export default ManagerEdit

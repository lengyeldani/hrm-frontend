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
        .then(this.setState({dataLoaded:true}))

        getUserById(id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                firstName:data.firstName,
                lastName:data.lastName,
                username:data.username,
                id:data.id
            })
        })        
    }

    handlePageClick = (selectedObject)=> {        
        this.getData(selectedObject.selected +1)
        .then(response => response.json())
        .then(data => this.setState({
            users:data.data,
            current_page:selectedObject.selected,
            last_page:data.last_page
        }))
        .finally(()=> this.setState({dataLoaded:true}))
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
    

    renderTable = () => {
        if(this.state.dataLoaded && this.state.vacations.length>0){
            return (
                <ManagerEditTableRows
                data={this.state.vacations}                
                refreshData={this.getData}
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
                <h3 className="mb-5 mt-2">MANAGER EDIT</h3>
                <div className="row align-items-end p-3 mb-3 border-top border-bottom">
                    <div className="col-4">
                        <label>Username:</label>
                        <input className="form-control" type="text" value={this.state.username} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>First name:</label>
                        <input className="form-control" type="text" value={this.state.firstName} readOnly></input>
                    </div>
                    <div className="col-4">
                        <label>Last name:</label>
                        <input className="form-control" type="text" value={this.state.lastName} readOnly></input>
                    </div>
                </div>
                <div className="row align-items-end mb-3 p-3">
                    <div className="col-3">
                    <label>Start:</label>
                        <input className="form-control" value={this.state.start} onChange={e => this.setState({start:e.target.value})} type="date"/>
                    </div>
                    <div className="col-3">
                    <label>End:</label>
                        <input className="form-control" value={this.state.end} onChange={e => this.setState({end:e.target.value})} type="date"/>
                    </div>
                    <div className="col-2 ">
                        <button onClick={this.handleRequestVacation} className="btn btn-primary">Send vacation</button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>status</th>
                            <th>start</th>
                            <th>end</th>
                            <th>change status</th>
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

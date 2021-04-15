import React, { Component } from 'react';
import ManagerTableRows from '../VacationManager/ManagerTableRows';
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {employeesByDepartment} from '../../Services/UserService'

export class Manager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataLoaded:false,
            users:[],
            current_page:1,
            last_page:''
        }
    }

    getAllEmployee = () => {
        employeesByDepartment(this.state.current_page)
        .then(response => response.json())
        .then(data => {
            this.setState({
                users:data.data,
                last_page:data.last_page
            })
        })
        .then(this.setState({dataLoaded:true}))
    }

    componentDidMount(){
        this.getAllEmployee()
    }

    renderTable = () => {
        if (this.state.dataLoaded && this.state.users.length>0) {
            return(
                <ManagerTableRows                    
                    data={this.state.users}
                    getAllEmployee={this.getAllEmployee}
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

    handlePageClick = (selectedObject)=> {        
        this.getAllEmployee(selectedObject.selected +1)
        .then(response => response.json())
        .then(data => this.setState({
            users:data.data,
            current_page:selectedObject.selected,
            last_page:data.last_page
        }))
        .finally(()=> this.setState({dataLoaded:true}))
    }

    render() {
        return (
            <div>
                <h3>Manager</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>username</th>                            
                            <th>first name</th>
                            <th>last name</th>                            
                            <th>maximum vacations</th>
                            <th>used vacations</th>
                            <th>remaining vacations</th>                            
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

export default Manager

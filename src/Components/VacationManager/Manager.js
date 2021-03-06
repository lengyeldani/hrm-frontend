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

  
    renderManagerTable = () => {
        if (this.state.dataLoaded && this.state.users.length>0) {
            return(
                <ManagerTableRows                    
                    data={this.state.users}
                    getAllEmployee={this.getAllEmployee}
                    clickedEmployee={this.clickedEmployee}
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
        return(
            <div>
                <h3 className="mb-5 mt-2">Szabads??g kezel??</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>felhaszn??l??n??v</th>                            
                            <th>keresztn??v</th>
                            <th>vezet??kn??v</th>                            
                            <th>??sszes szabads??g</th>
                            <th>felhaszn??lt szabads??g</th>
                            <th>felhaszn??lhat?? szabads??g</th> 
                            <th>f??gg??ben</th>  
                            <th></th>                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderManagerTable()}
                    </tbody>
                </table>
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
            </div>
        )}        
    
}

export default Manager

import React, { Component } from 'react'
import {getUsers} from '../../Services/UserService'
import UserTableRows from './UserTableRows';
import ReactLoader from 'react-loader-spinner'
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            links:{},
            meta:{},
            dataLoaded:false,
            per_page:10,
            current_page:1,
            last_page:1
        }
    }

    componentDidMount = () => {
      this.getAllUser()
    }

    getAllUser = () => {
        getUsers(this.state.current_page)
        .then(response => response.json())
        .then(data => this.setState({
            users:data.data,
            last_page:data.last_page
        }))
        .finally(()=> this.setState({dataLoaded:true}))
    }

    // handlePageClick = (page = 1) => {
    //     getUsers(this.state.current_page)
    //     .then(response => response.json())
    //     .then(data => this.setState(data))
    //     .finally(()=> this.setState({dataLoaded:true, current_page:page}))
    // }

    renderTable = () => {
        if (this.state.dataLoaded && this.state.users.length>0) {
            return(
                <UserTableRows                    
                    data={this.state.users}
                    getAllUser={this.getAllUser}
                />
            )
        }
        else{
            return(
                <tr>
                    <td className="text-center" colSpan="5">
                        <ReactLoader type="ThreeDots" color="#888888" height="50" width="50"/>
                    </td>
                </tr>
            )
        }
    }

    // renderPagination = () => {
    //     return this.state.dataLoaded && this.state.data.length > 0 ? (
    //         <nav>
    //             <ul className="pagination">
    //                 <li className="page-item">
    //                     <button className="page-link" onClick={this.getAllUser}>First</button>
    //                 </li>
    //                 <PageControl 
    //                     active={this.state.current_page}
    //                     page_count={this.state.meta.last_page}
    //                     click={this.handlePageClick}
    //                 />
    //                 <li className="page-item">
    //                     <button onClick={this.handlePageClick(this.state.meta.last_page)} className="page-link"> 
    //                         last
    //                     </button>
    //                 </li>
    //             </ul>
    //         </nav>
    //     ):null
    // }

    handlePageClick = (selectedObject)=> {        
        getUsers(selectedObject.selected +1)
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
                <h3>Admin Page</h3>               
                <NavLink to={"/admin/addUser"} className="btn btn-primary mb-2">
                      Add new user
                </NavLink>
               
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>username</th>
                            <th>role</th>
                            <th>department</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>date of birth</th>
                            <th>zip code</th>
                            <th>address</th>
                            <th>mother's fname</th>
                            <th>mother's lname</th>
                            <th></th>
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

export default Admin

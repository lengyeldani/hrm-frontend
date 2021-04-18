import React, { Component } from 'react'
import {getUsers} from '../../Services/UserService'
import UserTableRows from './UserTableRows';
import ReactLoader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';


export class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            dataLoaded:false,
            links:{},
            meta:{},
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
                    <td className="text-center" colSpan="11">
                        <ReactLoader type="ThreeDots" color="#888888" height="50" width="50"/>
                    </td>
                </tr>
            )
        }
    }

    

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
                <h3 className="mb-5 mt-2">Adminisztrátor felület</h3>               
                <NavLink to={"/admin/addUser"} className="btn btn-primary mb-2">
                      Felhasználó hozzáadása
                </NavLink>
               
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>felhasználónév</th>
                            <th>jogkör</th>
                            <th>osztály</th>
                            <th>keresztnév</th>
                            <th>vezetéknév</th>
                            <th>születési dátum</th>
                            <th>irányítószám</th>
                            <th>cím</th>
                            <th>anyja keresztneve</th>
                            <th>anyja vezetékneve</th>
                            <th>összes szabadság</th>
                            <th>felhasznált szabadság</th>
                            <th></th>
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

export default Admin

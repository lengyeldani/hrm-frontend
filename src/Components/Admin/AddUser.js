import React, { Component } from 'react'
import UserRoleOptions from './UserRoleOptions';
import {toast} from 'react-toastify'
import {getRoles, getDepartments, addUser} from '../../Services/UserService'
import UserDepartmentOptions from './UserDepartmentOptions';
import { withRouter } from "react-router";


export class AddUser extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            role:'',
            department:'',
            firstName:'',
            lastName:'',
            dateOfBirth:'',
            zipCode:'',
            address:'',
            mothersFirstName:'',
            mothersLastName:'',
            maxVacation:'',
            roles:[],
            departments:[]
        }
    }

    componentDidMount(){
        getRoles()
        .then(response => response.json()
        .then(roles => this.setState({roles})))   
        
        getDepartments()
        .then(response => response.json())
        .then(departments => this.setState({departments}))
        
    }

    handleInputChange = (event) => {        
        this.setState({[event.target.name]:event.target.value});
    }

    handleSave = () => {
        const data = {
            username: this.state.username,
            role: this.state.role,
            department: this.state.department,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            zipCode: this.state.zipCode,
            address: this.state.address,
            mothersFirstName: this.state.mothersFirstName,
            mothersLastName: this.state.mothersLastName,
            vacationCounter_max:this.state.maxVacation
        }

        addUser(data)
        .then(response => {
            if (response.ok) {
                toast.success('Felhasználó hozzáadása sikeres!')
                this.props.history.push('/admin')
            }
            else{
                toast.warning('Nem sikerült hozzáadni a felhasználót!')
            }
        })        
    }

    render() {
        return (
            <div>
                <h3 className="mb-5 mt-2">Felhasználó hozzáadása</h3>
                <div className="row">
                    <div className="form-group col-3">
                        <label>felhasználónév:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}                            
                            className="form-control"                            
                            name="username"
                            type="text"
                        />
                    </div>                    
                    <div className="form-group col-3">
                        <label>jogkör:</label>
                        <select
                            onChange={e=>this.setState({role:e.target.value})} 
                            className="form-control">
                            <option></option>
                            <UserRoleOptions roles={this.state.roles}/>
                        </select>
                    </div>
                    <div className="form-group col-3">
                        <label>osztály:</label>
                        <select 
                            className="form-control"
                            onChange={e => this.setState({department:e.target.value})}>
                            <option></option>
                            <UserDepartmentOptions departments={this.state.departments}/>
                        </select>
                    </div>
                    <div className="form-group col-3">
                    <label>keresztnév:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="firstName"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>vezetéknév:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="lastName"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>születési dátum:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="dateOfBirth"
                            type="date"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>irányítószám:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="zipCode"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>cím:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="address"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>anyja keresztneve:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="mothersFirstName"
                        /> 
                    </div>
                    <div className="form-group col-3">
                        <label>anyja vezetékneve</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                        className="form-control"                        
                        name="mothersLastName"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>összes szabadság:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                        
                            name="maxVacation"
                        />
                    </div>        
                </div>
                <div className="text-center">
                    <button onClick={this.handleSave} className="btn btn-primary mt-2 mb-2 btn-lg">Mentés</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddUser)

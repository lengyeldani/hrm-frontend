import React, { Component } from 'react'
import UserDepartmentOptions from './UserDepartmentOptions';
import UserRoleOptions from './UserRoleOptions';
import {toast} from 'react-toastify'
import {getRoles, getDepartments, updateUser, getUserById} from '../../Services/UserService'
import {useParams} from 'react-router-dom';

export class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
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

        const {id} = this.props.match.params;
        
        getUserById(id)
        .then(response => response.json())
        .then(user => this.setState({
            id:id,
            username: user.username,
            role:user.role_id,
            department:user.department_id,
            firstName:user.firstName,
            lastName:user.lastName,
            dateOfBirth:user.dateOfBirth,
            zipCode:user.zipCode,
            address:user.address,
            mothersFirstName:user.mothersFirstName,
            mothersLastName:user.mothersLastName,
            maxVacation:user.vacationCounter_max
        }))
        
    }

    handleInputChange = (event) => {        
        this.setState({[event.target.name]:event.target.value});
    }

    handleUpdate = () => {
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

        updateUser(data,this.state.id)
        .then(response => {
            if (response.ok) {
                toast.success('User updated successfully!')
            }
        })
    }

    render() {
        return (
            <div>
                <h3>Edit user</h3>
                <div className="row">
                    <div className="form-group col-3">
                        <label>username:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}                            
                            className="form-control"                            
                            name="username"
                            type="text"
                            value={this.state.username}
                        />
                    </div>                    
                    <div className="form-group col-3">
                        <label>role:</label>
                        <select
                            value={this.state.role}
                            onChange={e=>this.setState({role:e.target.value})} 
                            className="form-control">
                            <option></option>
                            <UserRoleOptions roles={this.state.roles}/>
                        </select>
                    </div>
                    <div className="form-group col-3">
                        <label>department:</label>
                        <select 
                            value={this.state.department}
                            className="form-control"
                            onChange={e => this.setState({department:e.target.value})}>
                            <option></option>
                            <UserDepartmentOptions departments={this.state.departments}/>
                        </select>
                    </div>
                    <div className="form-group col-3">
                    <label>first name:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="firstName"
                            value={this.state.firstName}
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>last name:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="lastName"
                            value={this.state.lastName}
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>date of birth:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="dateOfBirth"
                            type="date"
                            value={this.state.dateOfBirth}
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>zip code:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="zipCode"
                            value={this.state.zipCode}
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>address:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="address"
                            value={this.state.address}
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>mother's first name:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                            
                            name="mothersFirstName"
                            value={this.state.mothersFirstName}
                        /> 
                    </div>
                    <div className="form-group col-3">
                        <label>mother's last name</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                        className="form-control"                        
                        name="mothersLastName"
                        value={this.state.mothersLastName}
                        />
                    </div>  
                    <div className="form-group col-3">
                        <label>maximum vacations:</label>
                        <input 
                            onChange={e=>this.handleInputChange(e)}
                            className="form-control"                        
                            name="maxVacation"
                            value={this.state.maxVacation}
                        />
                    </div>       
                </div>
                <div className="text-center">
                    <button onClick={this.handleUpdate} className="btn btn-primary mt-2 mb-2 btn-lg">Update</button>
                </div>
            </div>
        )
    }
}

export default EditUser

import { Component } from 'react';
import './App.css';
import {getLoggedInUser} from './Services/UserService'
import {BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import Navbar from './Components/Common/Navbar'
import Admin from './Components/Admin/Admin';
import Footer from './Components/Common/Footer';
import Home from './Components/Home/Home'
import AddUser from './Components/Admin/AddUser';
import Manager from './Components/VacationManager/Manager';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EditUser from './Components/Admin/EditUser';
import Vacation from './Components/Vacation/Vacation';
import Loader from './Components/Common/Loader';
import ManagerEdit from './Components/VacationManager/ManagerEdit';


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedInUser: {},
      loading:true,
      authenticated:false
    };
  }

  componentDidMount = () => {
    getLoggedInUser()
    .then(response => response.json())
    .then(data => {
      if(data !== undefined && data.length !== 0){
        this.setState({
          loggedInUser:data,
          authenticated:true,
          loading:false
        })
      }       
    })
   
  }

  renderContent = () => {
    if (this.state.authenticated){
      return(
      <BrowserRouter>
       <div>
        <Navbar loggedInUser={this.state.loggedInUser}/>
          <div className="container-fluid">
          <ToastContainer/>
           <Switch>
            <Route path="/" exact render={(props)=><Home/>}></Route>
            <Route path="/admin" exact strict render={(props)=><Admin {...props}/>}></Route>
            <Route path="/vacation" exact strict render={(props)=><Vacation loggedInUser={this.state.loggedInUser} {...props}/>}></Route>
            <Route path="/admin/addUser" exact strict render={(props)=><AddUser {...props}/>}></Route>
            <Route path="/admin/edit/:id" exact strict render={(props)=><EditUser {...props}/>}></Route>            
            <Route path="/vacation/manager" exact strict render={(props)=><Manager loggedInUser={this.state.loggedInUser} {...props}/>}></Route>
            <Route path="/vacation/manager/edit/:id" exact strict  render={(props)=><ManagerEdit loggedInUser={this.state.loggedInUser} {...props} />}></Route>
           </Switch> 
         </div>
        <Footer/>
       </div>
       
      </BrowserRouter>
      );
    }
    else if(!this.state.authenticated){
      return(
        <Loader 
          loader={this.state.loading}
        />
      )
    }

    
  };

  render() {
    return this.renderContent();
  };
}

export default App;

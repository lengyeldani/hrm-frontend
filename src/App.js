import { Component } from 'react';
import './App.css';
import {getLoggedInUser} from './Services/UserService'
import {BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import Navbar from './Components/Common/Navbar'
import Admin from './Components/Admin/Admin';
import Footer from './Components/Common/Footer';
import Home from './Components/Home/Home'
import AddUser from './Components/Admin/AddUser';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EditUser from './Components/Admin/EditUser';
import Scheduler from './Components/Scheduler/Scheduler';
import Loader from './Components/Common/Loader';


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
            <Route path="/admin" exact strict render={(props)=><Admin/>}></Route>
            <Route path="/scheduler" exact strict render={(props)=><Scheduler/>}></Route>
            <Route path="/admin/addUser" exact strict render={(props)=><AddUser/>}></Route>
            <Route path="/admin/edit/:id" exact strict render={(props)=><EditUser {...props}/>}></Route>            
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

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


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedInUser: {}
    };
  }

  componentDidMount = () => {
    console.log(getLoggedInUser());
  }

  renderContent = () => {
     return(
      <BrowserRouter>
       <div>
        <Navbar/>
          <div className="container-fluid">
          <ToastContainer/>
           <Switch>
            <Route path="/" exact render={(props)=><Home/>}></Route>
            <Route path="/admin" exact strict render={(props)=><Admin/>}></Route>
            <Route path="/admin/addUser" exact strict render={(props)=><AddUser/>}></Route>
           </Switch> 
         </div>
        <Footer/>
       </div>
       
      </BrowserRouter>
      );
    
  };

  render() {
    return this.renderContent();
  };
}

export default App;

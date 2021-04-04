import { Component } from 'react';
import './App.css';
import {getLoggedInUser} from './Services/AdminService'




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

       <div>

    </div>
      );
    
  };

  render() {
    return this.renderContent();
  };
}

export default App;

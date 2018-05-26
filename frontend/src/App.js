import React, { Component } from 'react';
import ChannelsList from './components/ChannelsList';
import Register from './components/Register';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    callBack = () =>{
        this.forceUpdate();
    };
  render() {
      const { cookies } = this.props;
      console.log(cookies.get('username'));
    if (cookies.get('username')){
      return (
      <ChannelsList/>
    );
    } else {
        return (<Register callBack = {this.callBack}/>)
    }
  }
}

export default withCookies(App);

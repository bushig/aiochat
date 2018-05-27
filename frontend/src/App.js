import React, {Component} from 'react';
import ChannelsList from './components/ChannelsList';
import Channel from './components/Channel'
import Register from './components/Register';
import {withCookies} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    callBack = () => {
        this.forceUpdate();
    };
    removeCookies = () =>{
        const {cookies} = this.props;
        cookies.remove('AIOHTTP_SESSION');
        cookies.remove('username');
        cookies.remove('channels');
        this.callBack();
    };
    render() {
        const {cookies} = this.props;
        console.log(cookies.get('username'));
        if (cookies.get('username')) {
            if (cookies.get('channels')) {
                return <Channel  id={Number(cookies.get('channels'))}/>
            } else return <ChannelsList removeCookies={this.removeCookies}/>
        } else {
            return (<Register callBack={this.callBack}/>)
        }
    }
}

export default withCookies(App);

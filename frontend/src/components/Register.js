import React, {Component} from 'react';

const MAINSITE = 'https://aiochat.tk';

class Register extends Component {
    constructor(){
        super();
        this.state = {username: "", password: ""}
    }
    onRegister = () => {
        console.log('register');
        let data = {username: this.state.username, password: this.state.password};
        fetch(`${MAINSITE}/api/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        }).then((json)=>{
            console.log(json);
            this.props.callBack();
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    onLogin = () => {
        console.log('login');
        let data = {username: this.state.username, password: this.state.password};
        fetch(`${MAINSITE}/api/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        }).then((json)=>{
            console.log(json);
            this.props.callBack();
        })
            .catch(function (error) {
                console.log(error);
            });
    };
     handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };
    render() {
        return (
            <div className="col-md-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign In</h3>
                    </div>
                    <div className="panel-body">
                        <fieldset>
                            <div className="form-group">
                                <input className="form-control" placeholder="Login" name="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.handleChange}
                                       value={this.state.password}/>
                            </div>
                            <button className="btn btn-sm btn-success" onClick={this.onLogin}>Login</button>
                            <button className="btn btn-sm btn-warning" onClick={this.onRegister}>Sign up</button>
                        </fieldset>
                    </div>
                </div>
            </div>);
    }
}

export default Register;
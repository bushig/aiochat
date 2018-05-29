import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class Channel extends Component {
    constructor() {
        super();
        this.state = {messages: [], users: [], activeUser: null, loading: false}
    }
    render() {
        if (this.state.loading){
            return <ReactLoading color={'#242424'}/>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="row chats-row">
                            <div className="col-md-12">
                                <button id="chat-leave" className="btn btn-default btn-sm" onClick={this.props.onLeaveHandler}>
                                    Leave Chat
                                </button>
                                <h3>Users:</h3>
                            </div>
                            <div className="col-md-12">
                                {this.state.users.map((user)=><a key = {user.name} href="#" className="list-group-item">{user.name}</a>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 current-chat">
                        <div className="row chat-toolbar-row">
                        </div>
                        <div className="row current-chat-area">
                            <div className="col-md-12">
                                <ul className="media-list">
                                    <li className="media">
                                        <div className="media-body">
                                            <div className="media">
                                                <div className="media-body">
                                                    Donec sit amet ligula enim. Duis vel condimentum massa.
                                                    Donec sit amet ligula enim. Duis vel condimentum massa.Donec sit
                                                    amet
                                                    ligula enim.
                                                    Duis vel condimentum massa.
                                                    Donec sit amet ligula enim. Duis vel condimentum massa.
                                                    <br/>
                                                    <small className="text-muted">Alex Deo | 23rd June at 5:00pm
                                                    </small>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row current-chat-footer">
                            <div className="panel-footer">
                                <div className="input-group">
                                    <input type="text" className="form-control"/>
                                    <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Send</button>
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Channel;


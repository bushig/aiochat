import React, {Component} from 'react';
import ReactLoading from 'react-loading';

const MAINSITE = 'https://aiochat.tk';

class ChannelsList extends Component {
    constructor() {
        super();
        this.state = {channels: [], loading: true, channelName: ""}
    }

    componentDidMount=()=> {
        this.updateChannelList()
    }

    updateChannelList = ()=> {
        this.setState({loading: true});
        fetch(`${MAINSITE}/api`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
            credentials: 'include'
        }).then((response) =>{
            return response.json()
        }).then((json) => {
            console.log(json);
            let state = {channels: json, loading:false};
            this.setState(state);
        })
            .catch( (error) =>{
                console.log(error);
                console.log(this);
                this.props.removeCookies();
            });
    }

    onClickHandler(e) {
        console.log('Clicked');
    }

    onAddHandler = (e)=>{
        let name = this.state.channelName;
        console.log(name);
        fetch(`${MAINSITE}/api`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
            body: JSON.stringify({name: name}),
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log(json);
            this.updateChannelList();
        })
            .catch(function (error) {
                console.log(error);
                this.props.removeCookies();
            });
    };
    onChangeHandler = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };
    render() {
        const loading = this.state.loading ? <ReactLoading color={'#242424'}/> : <ul className="list-group">
                    {this.state.channels.map((channel)=><li key={channel.id} className="list-group-item" onClick={this.onClickHandler}>{channel.name}</li>)}
                </ul>;
        return (
            <div className="well text-right col-md-2 list-left">
                <div className="input-group">
                    <input type="text" name="channelName" className="form-control" placeholder="New channel" onChange={this.onChangeHandler}/>
                    <div className="input-group-append">
                        <button type="button" id="add" className="btn btn-success btn-sm" onClick={this.onAddHandler}>Add</button>
                    </div>
                </div>
                {loading}
            </div>
        )
    }
}

export default ChannelsList;


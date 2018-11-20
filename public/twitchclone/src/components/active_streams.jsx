import React, { Component } from 'react'
import StreamList from './streamlist';
import { VideoPlayer } from './videoplayer';
import _ from 'lodash';
import uuid from 'uuid';

export default class ActiveStreams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            live: null,
            stream: null
        }
    }
    async componentDidMount() {
        const fetchData = await fetch('/streamers/live');
        const data = await fetchData.json();
        const newData = _.mapKeys(data, 'channelId');
        this.setState({live: newData});

        this.checker = setInterval(async () => {
            const fetchData = await fetch('/streamers/live');
            const data = await fetchData.json();
            const newData = _.mapKeys(data, 'channelId');
            this.setState({live: newData});
        }, 25000);
    }
    render() {
        
        const { live } = this.state;
        if (!live) return null;

        return (
            <div className="maindiv">
            <div className="navigator">
                <div className="streamlist active">
                <h5 className="online ml-2">Online <small>{Object.keys(this.state.live).length}</small></h5>

                    <div className="actuallist">
                    {this.renderStreams()}
                    </div>

                    <StreamList />
                </div>
            </div>
            <VideoPlayer onStream={this.state.stream} live={this.state.live} />
            </div>
        );
    }
    renderStreams() {
        const { live } = this.state;
       
        return Object.values(live).map(stream => {
            const avatar = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${stream.name}.jpg`;
            const { viewers } = stream;
            return (
                <div className="streamer" key={uuid()} onClick={() => this.setState({stream: stream.channelId})}>
                <div className="substreamer">
                <img src={avatar} alt="streamimage" className="ml-2" />
                <div className="streamname ml-2 ">
                <span>{stream.name}</span>
                <span><small>is Playing IRL</small></span>
                </div>
                <span className="marginme"><small>{viewers} viewers</small></span>  
                </div>
                </div>
            );
        })
    }
}
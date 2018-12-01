import React, { Component } from 'react'
import _ from 'lodash'
import uuid from 'uuid'

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updater: []
        }
        this.styles = {
            card: {color: 'white'}
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // finding the difference between the previous streamers and the current streamers, seeing if there is a difference (thank you lodash)
        if (prevProps.active !== this.props.active) {
            const { active } = this.props;

            const oldnames = Object.values(prevProps.active).map(stream => stream.name)
            const newnames = Object.values(active).map(stream => stream.name);

            const update = _.difference(newnames, oldnames);
            this.setState({updater: update})
            setTimeout(() => {
                this.setState({nowLive: []});
            }, 8000)
         }
    }

    render() {

        const {updater} = this.state;
        if (!updater)
        if (!updater.length > 0) {
            return (
                <div className="notify" style={this.styles.card}></div>
            );
        }

        return (
            <div className="notify act" style={this.styles.card}>{this.updateStream()}</div>
        );
    }
    updateStream() {
        const {updater} = this.state;
        return updater.map(stream => {
            return (
                <div key={uuid()} className="flexme" style={this.styles.card}><span>{stream}<br/> is online!</span></div>
            );
        })
    }
}

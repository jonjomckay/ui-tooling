import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Button, Spin } from "antd";

export default class Loadable extends Component {
    // render() {
    //     if (this.props.isLoading) {
    //         return <Spin size="large" style={{ marginTop: '10%', textAlign: 'center', width: '100%' }} />
    //     }
    //
    //     return this.props.children;
    // }

    state = {
        showSpinner: false
    };

    componentDidMount = () => {
        setTimeout(() => {
            if (this.props.isLoading) {
                this.setState({
                    showSpinner: true
                });
            }
        }, 200);
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isLoading === false) {
            this.setState({
                showSpinner: false
            });
        }
    };

    render() {
        let content = this.props.children;

        console.log(this.state.showSpinner);

        if (this.state.showSpinner) {
            content = (
                <div className="loadable">
                    <Spin size="large" style={ { marginTop: '10%', textAlign: 'center', width: '100%' } } />
                </div>
            )
        }

        return (
            <div>
                <QueueAnim className={ this.props.className }>
                        <div key="children">
                            { content }
                        </div>
                </QueueAnim>
            </div>
        )
    }
}
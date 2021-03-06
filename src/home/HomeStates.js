import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Badge, Button, Divider, Table } from 'antd';
import timeago from 'timeago.js';
import { Link } from "react-router-dom";
import StateStatus from "../states/StateStatus";

class HomeStates extends Component {
    state = {
        isLoading: true,
        pagination: {
            current: 1,
            pageSize: 10
        },
        states: []
    };

    componentDidMount = () => {
        this.fetchStates();
    };

    fetchStates = () => {
        this.setState({
            isLoading: true
        });

        const request = {
            headers: {
                'Authorization': this.props.token
            },
            params: {
                page: this.state.pagination.current,
                pageSize: this.state.pagination.pageSize
            }
        };

        axios.get(process.env.REACT_APP_BASE_URI + '/api/admin/1/states', request)
            .then(response => {
                this.setState(prevState => {
                    return {
                        pagination: {
                            ...prevState.pagination,
                            total: response.data._meta.total
                        },
                        states: response.data.items
                    };
                });
            })
            .catch(() => this.setState({
                states: []
            }))
            .finally(() => this.setState({
                isLoading: false
            }));
    };

    onTableChange = (pagination) => {
        const stateChange = {
            pagination: pagination
        };

        this.setState(stateChange, this.fetchStates);
    };

    renderStatus = (text, state) => {
        return <StateStatus state={ state } />
    };

    render() {
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={ this.fetchStates }
                        loading={ this.state.isLoading }
                    >
                        Reload
                    </Button>
                </div>
                <Table dataSource={ this.state.states }
                       loading={ this.state.isLoading }
                       onChange={ this.onTableChange }
                       pagination={ this.state.pagination }
                       rowKey={ state => state.id }
                       size="middle"
                >
                    <Table.Column title="Status" key="status" render={ this.renderStatus } />
                    <Table.Column title="ID" key="id" render={ (text, state) => (
                        <span>
                            <Link to={ '/states/' + state.id }>{ state.id }</Link>
                        </span>
                    )} />
                    <Table.Column title="Flow Name" dataIndex="currentFlowDeveloperName" key="currentFlowDeveloperName" />
                    <Table.Column title="Current User" key="currentRunningUserEmail" render={ (text, state) => (
                        <span>
                            { state.currentRunningUserEmail || <i>Public User</i> }
                        </span>
                    )} />
                    <Table.Column title="Created" key="dateCreated" render={ (text, state) => (
                        <span>
                            { timeago().format(state.dateCreated) }
                        </span>
                    )} />
                    <Table.Column title="Modified" key="dateModified" render={ (text, state) => (
                        <span>
                            { timeago().format(state.dateModified) }
                        </span>
                    )} />
                    <Table.Column title="Actions" key="actions" render={ (text, state) => (
                        <span>
                            <a href={ state.joinUri } target="_blank">Join</a>
                            <Divider type="vertical" />
                            <a className="color-red" href="">Delete</a>
                        </span>
                    )} />
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tenant: state.app.tenant,
        token: state.app.tenantToken
    };
};

export default connect(mapStateToProps)(HomeStates);

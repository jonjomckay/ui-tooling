import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Divider, Table } from 'antd';
import timeago from 'timeago.js';

class HomeStates extends Component {
    state = {
        isLoading: true,
        pagination: {

        },
        states: []
    };

    componentDidMount = () => {
        this.fetchStates();
    };

    fetchStates = (page = 1, pageSize = 10) => {
        this.setState({
            isLoading: true
        });

        const request = {
            headers: {
                'Authorization': this.props.token
            },
            params: {
                page,
                pageSize
            }
        };

        axios.get(process.env.REACT_APP_BASE_URI + '/api/admin/1/states', request)
            .then(response => {
                this.setState(prevState => {
                    return {
                        pagination: {
                            ...prevState,
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
        this.setState({
            pagination: pagination
        });

        this.fetchStates(pagination.current, pagination.pageSize);
    };

    render() {
        return (
            <div>
                <h2>States</h2>

                <Table dataSource={ this.state.states }
                       loading={ this.state.isLoading }
                       onChange={ this.onTableChange }
                       pagination={ this.state.pagination }
                       rowKey={ state => state.id }
                >
                    <Table.Column title="ID" dataIndex="id" key="id" />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Divider, Table } from 'antd';
import timeago from 'timeago.js';

class HomeStatesByFlow extends Component {
    state = {
        isLoading: true,
        pagination: {

        },
        states: []
    };

    componentDidMount = () => {
        this.fetchStates();
    };

    fetchStates = (page = 1, pageSize = 10, orderBy = 'developerName', orderDirection = 'asc') => {
        this.setState({
            isLoading: true
        });

        const request = {
            headers: {
                'Authorization': this.props.token
            },
            params: {
                orderBy,
                orderDirection,
                page,
                pageSize
            }
        };

        axios.get('https://staging.manywho.com/api/admin/1/states/flow', request)
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

    onTableChange = (pagination, filter, sorter) => {
        this.setState({
            pagination: pagination
        });

        const orderDirection = sorter.order === 'ascend'
            ? 'asc'
            : 'desc';

        this.fetchStates(pagination.current, pagination.pageSize, sorter.field, orderDirection);
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
                    <Table.Column title="Count" dataIndex="count" key="count" sorter={ true } />
                    <Table.Column title="ID" dataIndex="id" key="id" sorter={ true } />
                    <Table.Column title="Flow Name" dataIndex="developerName" key="developerName" sorter={ true } />
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

export default connect(mapStateToProps)(HomeStatesByFlow);

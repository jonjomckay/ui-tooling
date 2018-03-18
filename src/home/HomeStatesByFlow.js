import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

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

        axios.get(process.env.REACT_APP_BASE_URI + '/api/admin/1/states/flow', request)
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
                <Table dataSource={ this.state.states }
                       loading={ this.state.isLoading }
                       onChange={ this.onTableChange }
                       pagination={ this.state.pagination }
                       rowKey={ state => state.id }
                       size="middle"
                >
                    <Table.Column title="# of States" dataIndex="count" key="count" sorter={ true } />
                    <Table.Column title="Flow ID" dataIndex="id" key="id" sorter={ true } />
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

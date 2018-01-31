import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from "antd";
import TimeAgo from 'timeago-react';
import HomeLoginSource from "./HomeLoginSource";

import './HomeTenantSelector.css';

class HomeTenantSelector extends Component {
    state = {
        isLoading: true,
        tenants: []
    };

    componentDidMount = () => {
        HomeLoginSource.listTenants(this.props.token)
            .then(response => this.setState({
                isLoading: false,
                tenants: response.data.tenants
            }));
    };

    onClickTenant = (id) => {
        this.setState({
            isLoading: true
        });

        HomeLoginSource.loginTenant(this.props.token, id)
            .then(response => {
                this.props.dispatch({
                    type: 'SET_TENANT_TOKEN',
                    tenant: id,
                    token: response.data
                });
            });
    };

    renderItem = (item) => {
        const lastLoggedInAt = item.lastLoggedInAt ?
            <TimeAgo datetime={ item.lastLoggedInAt } /> :
            'Unknown';

        return (
            <List.Item className="tenant" onClick={ () => this.onClickTenant(item.id) }>
                <List.Item.Meta
                    title={ item.developerName }
                    description={ item.developerSummary || <i>No summary available</i> } />
                { lastLoggedInAt }
            </List.Item>
        );
    };

    render() {
        return (
            <div className="home-tenant-selector">
                <h1>Choose a tenant</h1>

                <List dataSource={ this.state.tenants }
                      loading={ this.state.isLoading }
                      renderItem={ this.renderItem } />
            </div>
        )
    }
}

const mapStateToProps = (state, dispatch) => {
    return {
        dispatch: dispatch,
        token: state.app.token
    };
};

export default connect(mapStateToProps)(HomeTenantSelector);
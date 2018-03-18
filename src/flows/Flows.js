import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Icon, Row } from 'antd';
import Loadable from '../common/Loadable';

import './Flows.css';
import FlowsSource from "./FlowsSource";
import { Link } from "react-router-dom";

class Flows extends Component {
    state = {
        flows: [],
        isLoading: true
    };

    componentDidMount = () => {
        FlowsSource.list(this.props.token)
            .then(response => this.setState({
                flows: response.data,
                isLoading: false
            }));
    };

    render() {
        const flows = this.state.flows.map(flow => {
            const runLink = process.env.REACT_APP_BASE_URI + this.props.tenant + '/play/default?flow-id=' + flow.id.id + '&flow-version-id=' + flow.id.versionId;

            const actions = [
                <a href={ runLink } target="_blank">
                    <Icon type="caret-right" />
                </a>,
                <Link to={ '/flows/' + flow.id.id + '/graph' }>
                    <Icon type="edit" />
                </Link>,
                <span>
                    <Icon type="line-chart" />
                </span>
            ];

            return (
                <Col key={ flow.id.id } span={ 6 }>
                    <Card actions={ actions } bordered={ false } className="flow" title={ flow.developerName }>
                        <Card.Meta description={ flow.developerSummary || 'No summary available' } />
                    </Card>
                </Col>
            );
        });

        return (
            <div className="flows">
                <h1>Flows</h1>

                <Row gutter={ 16 }>
                    <Loadable isLoading={ this.state.isLoading }>
                        { flows }
                    </Loadable>
                </Row>
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

export default connect(mapStateToProps)(Flows);

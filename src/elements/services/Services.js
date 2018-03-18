import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ServiceSource from './ServiceSource';
import timeago from 'timeago.js';
import { Divider, Table } from "antd";
import Whos from "../../utils/Whos";

class Services extends Component {
    state = {
        isLoading: true,
        services: []
    };

    componentDidMount = () => {
        ServiceSource.list(this.props.token)
            .then(response => this.setState({
                services: response.data,
                isLoading: false
            }));
    };

    render() {
        return (
            <div className="services">
                <h1>Services</h1>

                <Table dataSource={ this.state.services } loading={ this.state.isLoading }>
                    <Table.Column title="Name" dataIndex="developerName" key="developerName" />
                    <Table.Column title="URI" dataIndex="uri" key="uri" />
                    <Table.Column title="Modified" key="dateModified" render={ (text, record) => (
                        <span>
                            { timeago().format(record.dateModified) } by { Whos.fullName(record.whoModified) }
                        </span>
                    )} />
                    <Table.Column title="Actions" key="actions" render={ (text, record) => (
                        <span>
                            <Link to={ '/elements/services/' + record.id }>Edit</Link>
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
        token: state.app.tenantToken
    };
};

export default connect(mapStateToProps)(Services);

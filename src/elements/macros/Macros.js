import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table } from "antd";
import timeago from 'timeago.js';
import MacroSource from "./MacroSource";
import Whos from "../../utils/Whos";

class Macros extends Component {
    state = {
        isLoading: true,
        macros: []
    };

    componentDidMount = () => {
        MacroSource.list(this.props.token)
            .then(response => this.setState({
                services: response.data,
                isLoading: false
            }));
    };

    render() {
        return (
            <div className="macros">
                <h1>Macros</h1>

                <Table dataSource={ this.state.services } loading={ this.state.isLoading }>
                    <Table.Column title="Name" dataIndex="developerName" key="developerName" />
                    <Table.Column title="Created" key="dateCreated" render={ (text, record) => (
                        <span>
                            { timeago().format(record.dateCreated) } by { Whos.fullName(record.whoCreated) }
                        </span>
                    )} />
                    <Table.Column title="Modified" key="dateModified" render={ (text, record) => (
                        <span>
                            { timeago().format(record.dateModified) } by { Whos.fullName(record.whoModified) }
                        </span>
                    )} />
                    <Table.Column title="Actions" key="actions" render={ (text, record) => (
                        <span>
                            <Button>
                                <Icon type="edit" /> Edit
                            </Button>
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

export default connect(mapStateToProps)(Macros);

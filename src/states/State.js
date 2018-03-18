import React, { Component } from 'react';
import StatesSource from "./StatesSource";
import { connect } from "react-redux";
import { Table, Timeline } from "antd";
import StateStatus from "./StateStatus";
import StateDescription from "./StateDescription";

class State extends Component {
    state = {
        isLoading: true,
        state: {
            currentFlowDeveloperName: '',
            currentFlowId: {
                id: '',
                versionId: ''
            },
            stateEntries: [],
            values: []
        }
    };

    componentDidMount = () => {
        StatesSource.get(this.props.token, this.props.match.params.id)
            .then(response => {
                this.setState({
                    isLoading: false,
                    state: response.data
                });
            });
    };

    renderValueValue = (text, value) => {
        // TODO: Handle object data displaying
        if (value.objectData) {
            return (
                <a href="#">View</a>
            );
        }

        return value.contentValue;
    };

    render() {
        const state = this.state.state;

        // TODO: Sort this by date
        const timeline = (state.stateEntries || []).map((stateEntry, i) => {
            let color = 'blue';

            // If the state is done, and this is the last state entry
            if (state.isDone && state.stateEntries.length === i + 1) {
                color = 'green';
            }

            return (
                <Timeline.Item color={ color } key={ stateEntry.id }>
                    { stateEntry.dateCommitted }: { stateEntry.mapElementDeveloperName }
                </Timeline.Item>
            )
        });

        return (
            <div>
                <h1>State: { state.id }</h1>

                <div>
                    <b><StateStatus state={ state } /></b>. <StateDescription state={ state } />
                </div>

                <p>
                    Created At: { state.dateCreated }
                </p>
                <p>
                    Modified At: { state.dateModified }
                </p>
                <p>
                    Expires At: { state.expiresAt || 'Never' }
                </p>
                <p>
                    Current Flow: { state.currentFlowDeveloperName } ({ state.currentFlowId.id } / { state.currentFlowId.versionId })
                </p>
                <p>
                    Current Map Element: { state.currentMapElementDeveloperName } ({ state.currentMapElementId })
                </p>
                <p>
                    Current Running User: { state.currentRunningUserEmail || 'None (public)' }
                </p>
                <p>
                    Has Errors: { state.hasRootFaults }
                </p>
                <p>
                    Done?: { state.isDone ? 'Yes' : 'No' }
                </p>
                <p>
                    Expired?: { state.isExpired ? 'Yes' : 'No' }
                </p>
                <p>
                    Join URI: { state.joinUri }
                </p>

                <h2>Values</h2>

                <Table dataSource={ state.values }
                       loading={ this.state.isLoading }
                       rowKey={ value => value.valueElementId }
                       size="middle"
                >
                    <Table.Column title="Name" key="valueElementDeveloperName" render={ (text, value) => (
                        <span>
                            { value.valueElementDeveloperName || <i>Unknown</i> }
                        </span>
                    )} />
                    <Table.Column title="ID" dataIndex="valueElementId" key="valueElementId" />
                    <Table.Column title="Value" key="value" render={ this.renderValueValue } />
                </Table>

                <h2>Timeline</h2>

                <Timeline pending={ state.isDone ? false : 'In progress...' }>
                    { timeline }
                </Timeline>
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

export default connect(mapStateToProps)(State);

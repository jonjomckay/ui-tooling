import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlowGraphSource from "./FlowGraphSource";
import './FlowGraph.css';
import { mxEvent, mxGraph, mxPoint, mxRubberband, mxUndoManager } from 'jjgraph';
import EditOutcome from "./outcomes/EditOutcome";

class FlowGraph extends Component {
    graph = null;
    state = {
        graph: {
            id: {

            },
            mapElements: []
        },
        isLoading: true
    };

    componentDidMount = () => {
        FlowGraphSource.get(this.props.token, this.props.match.params.id)
            .then(response => {
                this.setState({
                    graph: response.data,
                    isLoading: false
                });
            })
            .then(this.renderCanvas);
    };

    saveMapElement = (mapElement) => {
        return FlowGraphSource.save(this.props.token, {
            id: this.state.graph.id,
            mapElements: [mapElement]
        }).then(response => this.setState({
            graph: response.data,
            isLoading: false
        })).then(this.renderCanvas);
    };

    onElementMove = (handler, event) => {
        const cells = event.getProperty('cells');

        cells.forEach(cell => {
            let mapElement = this.state.graph.mapElements.find(element => element.id === cell.id);
            if (mapElement) {
                this.saveMapElement({
                    ...mapElement,
                    x: cell.geometry.x,
                    y: cell.geometry.y
                });
            }
        });
    };

    onOutcomeCreate = (handler, event) => {
        const edge = event.getProperty('cell');

        // We call this after the outcome edits are submitted, which updates the edge's label in the graph
        const onChangeLabel = (value) => {
            handler.graph.getModel().setValue(edge, value);
        };

        this.props.dispatch({
            type: 'TOGGLE_OUTCOME_EDITING',
            onChangeLabel: onChangeLabel,
            source: edge.source.id,
            target: edge.target.id
        });
    };

    renderCanvas = () => {
        if (this.graph) {
            // Creates the graph inside the given container
            const graph = new mxGraph(this.graph);

            graph.setCellsResizable(false);
            graph.setAutoSizeCells(true);
            graph.setCellsEditable(false);
            graph.setEdgeLabelsMovable(false);
            graph.setConnectable(true);
            graph.setAllowDanglingEdges(false);
            graph.setTooltips(false);
            graph.setAllowLoops(false);
            graph.setDropEnabled(true);
            graph.setSplitEnabled(false);
            graph.setEdgeLabelsMovable(false);
            graph.setConstrainChildren(true);
            graph.keepEdgesInBackground = true;
            graph.connectionHandler.targetConnectImage = true;
            graph.defaultOverlap = 0;

            // Enable rubberband selection
            new mxRubberband(graph);

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();

            // Add undo support to the graph (i.e. for when modals are cancelled)
            const undoManager = new mxUndoManager();
            const undoListener = (sender, event) => {
                undoManager.undoableEditHappened(event.getProperty('edit'));
            };

            graph.getModel().addListener(mxEvent.UNDO, undoListener);
            graph.getView().addListener(mxEvent.UNDO, undoListener);

            graph.addListener(mxEvent.MOVE_CELLS, this.onElementMove);

            this.props.dispatch({
                type: 'SET_UNDO_MANAGER',
                handler: undoManager
            });

            graph.addListener(mxEvent.CONNECT_CELL, (handler, event) => {
                console.log('connected cell');
            });

            // Add outcome creation handling
            graph.connectionHandler.addListener(mxEvent.CONNECT, this.onOutcomeCreate);

            // Get the root parent for inserting new cells
            const parent = graph.getDefaultParent();

            // Add in all the map elements as graph vertices
            const vertices = new Map(this.state.graph.mapElements.map(element => {
                return [
                    element.id,
                    graph.insertVertex(parent, element.id, element.developerName, element.x, element.y, 80, 50)
                ];
            }));

            // Add in all the outcomes as graph edges
            this.state.graph.mapElements.forEach(element => {
                const source = vertices.get(element.id);

                (element.outcomes || []).forEach(outcome => {
                    const target = vertices.get(outcome.nextMapElementId);

                    const edge = graph.insertEdge(parent, outcome.id, outcome.label, source, target);

                    if (outcome.controlPoints && outcome.controlPoints.length > 0) {
                        edge.getGeometry().points = [
                            new mxPoint(outcome.controlPoints[0].x, outcome.controlPoints[0].y)
                        ];
                    }
                });
            });

            // Updates the display
            graph.getModel().endUpdate();
        }
    };

    render() {
        return (
            <div>
                <EditOutcome />

                <div id="graph" ref={ ref => this.graph = ref } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.app.tenantToken
    };
};

export default connect(mapStateToProps)(FlowGraph);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Select, notification } from 'antd';
import Editor from '../common/Editor';
import PlayerCreate from "./PlayerCreate";

import './Players.css';
import PlayersSource from "./PlayersSource";

class Players extends Component {
    state = {
        isLoading: true,
        isNewModalVisible: false,
        players: [],
        currentPlayer: '',
        currentPlayerContent: ''
    };

    componentDidMount = () => {
        this.refreshPlayers();
    };

    loadPlayer = (name) => {
        PlayersSource.get(this.props.token, name)
            .then(response => this.setState({
                currentPlayer: name,
                currentPlayerContent: response.data,
                isLoading: false
            }));
    };

    onCloseModal = () => {
        this.setState({
            isNewModalVisible: false
        });
    };

    onDeleteClicked = () => {
        const name = this.state.currentPlayer;

        PlayersSource.delete(this.props.token, name)
            .then(response => this.setState({
                currentPlayer: '',
                currentPlayerContent: response.data,
                isLoading: false
            }))
            .then(this.refreshPlayers)
            .then(() => {
                notification.success({
                    message: 'Player deleted',
                    description: <span>The player <strong>{ name }</strong> was successfully deleted</span>
                });
            });
    };

    onEditorChange = (content) => {
        this.setState({
            currentPlayerContent: content
        });
    };

    onNewClicked = () => {
        this.setState({
            isNewModalVisible: true
        });
    };

    onNewCreated = (name, baseName) => {
        this.setState({
            isLoading: true
        });

        // First we load the desired base player, then we pipe the content into a new player and save it
        PlayersSource.get(this.props.token, baseName)
            .then(response => PlayersSource.save(this.props.token, name, response.data)
                .then(() => this.refreshPlayers())
                .then(() => this.loadPlayer(this.props.token, name))
                .then(() => this.onCloseModal())
                .then(() => notification.success({
                    message: 'Player created',
                    description: <span>The player <strong>{ name }</strong> was successfully created</span>
                })));
    };

    onSaveClicked = () => {
        PlayersSource.save(this.props.token, this.state.currentPlayer, this.state.currentPlayerContent)
            .then(response => this.setState({
                currentPlayerContent: response.data,
                isLoading: false
            }));
    };

    refreshPlayers = () => {
        return PlayersSource.list(this.props.token)
            .then(response => this.setState({
                currentPlayer: '',
                players: response.data,
                isLoading: false
            }));
    };

    render() {
        const players = this.state.players.map(player => {
            return <Select.Option key={ player } value={ player }>{ player }</Select.Option>
        });

        const actionsDisabled = this.state.currentPlayer.length === 0;

        return (
            <div className="players">
                <h1>Players</h1>

                <div className="actions">
                    <Select
                        className="select"
                        filterOption={ (input, option) => option.props.children.toLowerCase().includes(input.toLowerCase()) }
                        onChange={ this.loadPlayer }
                        optionFilterProp="children"
                        placeholder="Choose a player"
                        showSearch
                        value={ this.state.currentPlayer }>
                        { players }
                    </Select>

                    <Button className="button-new" onClick={ this.onNewClicked } type="primary" icon="plus">New</Button>

                    <Button.Group className="buttons">
                        <Button disabled={ actionsDisabled } onClick={ this.onDeleteClicked } type="danger" icon="delete">Delete</Button>
                        <Button disabled={ actionsDisabled } onClick={ this.onSaveClicked } type="primary" icon="save">Save</Button>
                    </Button.Group>
                </div>

                <Editor content={ this.state.currentPlayerContent }
                        language="html"
                        onChange={ this.onEditorChange } />

                <PlayerCreate isLoading={ this.state.isLoading }
                              onClose={ this.onCloseModal }
                              onSubmit={ this.onNewCreated }
                              players={ players }
                              visible={ this.state.isNewModalVisible } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.app.tenantToken
    };
};

export default connect(mapStateToProps)(Players);
import React, { Component } from 'react';
import { Alert, Button, Icon, Input, Modal, Select } from 'antd';

export default class PlayerCreate extends Component {
    state = {
        base: '',
        name: ''
    };

    onChangeBase = (base) => {
        this.setState({
            base: base
        })
    };

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    onSubmit = () => {
        this.props.onSubmit(this.state.name, this.state.base);
    };

    render() {
        return (
            <Modal title="New Player" onCancel={ this.props.onClose } visible={ this.props.visible } width={ 600 }
                   footer={[
                       <Button key="back" onClick={ this.props.onClose }>Cancel</Button>,
                       <Button key="submit" loading={ this.props.isLoading } type="primary" onClick={ this.onSubmit }>
                           <Icon type="plus-circle-o" /> Create
                       </Button>
                   ]}>
                <div>
                    <p>To create a new player, you'll need to choose a unique name and decide which existing player
                        you'd like to base it on.</p>

                    <Alert
                        message={ <span>If you're not sure which player to choose, use the one named <strong>default</strong>!</span> }
                        type="info"
                        showIcon />

                    <span>
                            <Input onChange={ this.onChangeName } placeholder="Player name" style={{ width: '55%', marginRight: '3%' }} />
                            <Select onChange={ this.onChangeBase } placeholder="Base player on" style={{ width: '42%' }}>
                                { this.props.players }
                            </Select>
                        </span>
                </div>
            </Modal>
        )
    }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input, Modal, Tooltip } from "antd";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditOutcome extends Component {
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleClose = () => {
        this.props.form.resetFields();

        this.props.dispatch({
            type: 'TOGGLE_OUTCOME_EDITING'
        });

        this.props.form.validateFields();
    };

    onCancel = () => {
        this.props.undo.undo();

        this.handleClose();
    };

    onSave = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onChangeLabel(values.label);
            }
        });

        this.handleClose();
    };

    render() {
        const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };

        // Only show error after a field is touched.
        const nameError = isFieldTouched('developerName') && getFieldError('developerName');
        const labelError = isFieldTouched('label') && getFieldError('label');

        return (
            <Modal onCancel={ this.onCancel }
                   title="Edit Outcome"
                   visible={ this.props.visible }
                   footer={ [
                       <Button key="back" onClick={ this.onCancel }>Cancel</Button>,
                       <Button key="submit"
                               type="primary"
                               disabled={ hasErrors(getFieldsError()) }
                               onClick={ this.onSave }>
                           Save
                       </Button>
                   ] }>

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Item
                        { ...formItemLayout }
                        label={ (
                            <span>
                                Name&nbsp;
                                <Tooltip title="Enter a descriptive name for the outcome, to be displayed when building">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        ) }
                        validateStatus={ nameError ? 'error' : '' }
                        help={ nameError || '' }
                    >
                        { getFieldDecorator('developerName', {
                            rules: [{ required: true, message: 'Please enter a name!' }],
                        })(
                            <Input placeholder="Name" />
                        ) }
                    </Form.Item>
                    <Form.Item
                        { ...formItemLayout }
                        label={ (
                            <span>
                                Label&nbsp;
                                <Tooltip title="The label to be displayed on the outcome when running (if applicable)">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        ) }
                        validateStatus={ labelError ? 'error' : '' }
                        help={ labelError || '' }
                    >
                        { getFieldDecorator('label', {
                            rules: [{ required: true, message: 'Please enter a label!' }],
                        })(
                            <Input placeholder="Label" />
                        ) }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        onChangeLabel: state.outcome.onChangeLabel,
        visible: state.outcome.isEditing,
        source: state.outcome.source,
        target: state.outcome.target,
        undo: state.graph.undoManager
    }
};

export default connect(mapStateToProps)(Form.create()(EditOutcome));
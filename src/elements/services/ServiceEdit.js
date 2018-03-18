import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Form, Icon, Input, Layout, Table, Tooltip } from 'antd';
import ServiceSource from './ServiceSource';

import './ServiceEdit.css';

class ServiceEdit extends Component {
    state = {
        isLoading: true,
        isLoadingTypes: true,
        service: {
            actions: [],
            providesAutoBinding: false,
            providesDatabase: false,
            providesFiles: false,
            providesIdentity: false,
            providesLocation: false,
            providesLogic: false,
            providesSocial: false,
            providesViews: false
        },
        types: []
    };

    componentDidMount = () => {
        ServiceSource.get(this.props.token, this.props.match.params.id)
            .then(response => {
                this.props.form.setFields({
                    developerName: {
                        value: response.data.developerName
                    },
                    uri: {
                        value: response.data.uri
                    }
                });

                this.setState({
                    isLoading: false,
                    service: response.data
                })
            });

        ServiceSource.getTypes(this.props.token, this.props.match.params.id)
            .then(types => this.setState({
                isLoadingTypes: false,
                types: types
            }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            }
        };

        const features = Object.keys(this.state.service)
            .sort((a, b) => a.localeCompare(b))
            .filter(key => key.startsWith('provides'))
            .map(key => {
                const feature = key.replace('provides', '');

                // We only display the feature if it's provided by the service
                if (this.state.service[key]) {
                    return (
                        <div className="feature">
                            <Icon className="color-green" type="check-circle-o" /> { feature }
                        </div>
                    );
                }

                return null;
            });

        const actions = (this.state.service.actions || [])
            .sort((a, b) => a.developerName.localeCompare(b.developerName))
            .map(action => (
                <Collapse.Panel header={ action.developerName } key={ action.uriPart }>
                    { action.developerSummary }
                </Collapse.Panel>
            ));

        // const types = (this.state.types || [])
        //     .sort((a, b) => a.developerName.localeCompare(b.developerName))
        //     .map(type => {
        //
        //     });

        return (
            <Layout className="service-edit">
                <Layout.Content>
                    <h1>Edit Service</h1>

                    <Form onSubmit={ this.onSubmit }>
                        <Form.Item { ...formItemLayout } label="Name">
                            { getFieldDecorator('developerName', {
                                rules: [{
                                    required: true, message: 'Please enter a name',
                                }],
                            })(
                                <Input />
                            ) }
                        </Form.Item>

                        <Form.Item { ...formItemLayout } label={ (
                            <span>
                                URI&nbsp;
                                <Tooltip title="Where is the service accessible at?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        ) }>
                            { getFieldDecorator('uri', {
                                rules: [{
                                    required: true, message: 'Please enter a URI',
                                }],
                            })(
                                <Input />
                            ) }
                        </Form.Item>

                        <Form.Item { ...tailFormItemLayout }>
                            <Button type="primary" htmlType="submit">
                                <Icon type="save" /> Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout.Content>

                <Layout.Sider breakpoint="lg" collapsedWidth="0" trigger={ null } width={ 600 }>
                    <h2>Information</h2>

                    <div className="information-section features">
                        <h3>
                            <Tooltip title="The features this service supports usage of inside flows">
                                <span className="tooltip">
                                    <Icon type="question-circle-o" />
                                </span>
                            </Tooltip>

                            Features
                        </h3>

                        { features }
                    </div>

                    <div className="information-section actions">
                        <h3>
                            <Tooltip title="The actions this service provides, for usage in Message elements">
                                <span className="tooltip">
                                    <Icon type="question-circle-o" />
                                </span>
                            </Tooltip>

                            Actions
                        </h3>

                        { actions.length ?
                            <Collapse bordered={ false }>{ actions }</Collapse> : 'No actions available' }
                    </div>

                    <div className="information-section types">
                        <h3>
                            <Tooltip title="The types this service installed in your tenant">
                                <span className="tooltip">
                                    <Icon type="question-circle-o" />
                                </span>
                            </Tooltip>

                            Types
                        </h3>

                        <Table
                            bordered={ false }
                            dataSource={ this.state.types }
                            loading={ this.state.isLoadingTypes }
                            locale={{ emptyText: 'No types' }}
                            showHeader={ false }
                            size="small"
                        >
                            <Table.Column title="Name" dataIndex="developerName" key="developerName" />
                        </Table>
                    </div>
                </Layout.Sider>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.app.tenantToken
    };
};

export default Form.create()(connect(mapStateToProps)(ServiceEdit));

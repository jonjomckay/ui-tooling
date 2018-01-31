import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import logo from '../common/logo.svg';

import './HomeLogin.css';
import HomeLoginSource from "./HomeLoginSource";

class HomeLogin extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                HomeLoginSource.login(values.email, values.password)
                    .then(response => this.props.dispatch({
                        type: 'SET_TOKEN',
                        token: response.data
                    }));
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="home-login">
                <Form className="form" onSubmit={ this.handleSubmit }>
                    <div className="brand">
                        <img src={ logo } alt="Boomi Flow" />
                    </div>

                    <Form.Item>
                        { getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please enter your email address!' }],
                        })(
                            <Input prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                   placeholder="Email address" />
                        ) }
                    </Form.Item>
                    <Form.Item>
                        { getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please enter your password!' }],
                        })(
                            <Input prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                   type="password"
                                   placeholder="Password" />
                        ) }
                    </Form.Item>
                    <Form.Item>
                        { getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        ) }
                        <a className="forgot" href="">Forgot password</a>

                        <Button type="primary" htmlType="submit" className="button">
                            Log in
                        </Button>

                        Or <a href="">sign-up for an account!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(connect()(HomeLogin));
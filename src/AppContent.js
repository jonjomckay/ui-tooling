import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';

import logo from './common/logo.svg';
import asyncComponent from "./common/AsyncComponent";
const Home = asyncComponent(() => import('./home/Home'));
const Flows = asyncComponent(() => import('./flows/Flows'));
const Players = asyncComponent(() => import('./players/Players'));
const Macros = asyncComponent(() => import('./elements/macros/Macros'));
const Services = asyncComponent(() => import('./elements/services/Services'));
const ServiceEdit = asyncComponent(() => import('./elements/services/ServiceEdit'));
const FlowGraph = asyncComponent(() => import('./flows/graph/FlowGraph'));
const HomeLogin = asyncComponent(() => import('./home/HomeLogin'));
const HomeTenantSelector = asyncComponent(() => import('./home/HomeTenantSelector'));

const MenuLink = (props) => (
    <Route path={ props.to } exact={ true } children={ ({ match }) => (
        <li className={ match ? 'ant-menu-item ant-menu-item-selected' : 'ant-menu-item' } role="menuitem">
            <Link to={ props.to }>{ props.children }</Link>
        </li>
    )}/>
);

class AppContent extends Component {
    onClickLogout = () => {
        this.props.dispatch({
            type: 'LOGOUT'
        });
    };

    render() {
        if (this.props.token) {
            let header;
            let content;

            // If we have a tenant token, then we carry on as normal, otherwise display the tenant selector
            if (this.props.tenantToken) {
                header = (
                    <Layout.Header className="header">
                        <Menu className="menu-main" mode="horizontal">
                            <Menu.Item>
                                <div className="brand">
                                    <img src={ logo } alt="Boomi Flow" />
                                </div>
                            </Menu.Item>
                            <MenuLink to="/">
                                <Icon type="home" /> Home
                            </MenuLink>
                            <MenuLink to="/flows">
                                <Icon type="cloud-o" /> Flows
                            </MenuLink>
                            <Menu.SubMenu className="menu-elements" key="elements" title={ <span><Icon type="appstore" /> Elements</span> }>
                                <MenuLink to="/elements/macros">Macros</MenuLink>
                                <MenuLink to="/elements/services">Services</MenuLink>
                                <Menu.Item>Types</Menu.Item>
                                <Menu.Item>Values</Menu.Item>
                            </Menu.SubMenu>

                            <MenuLink to="/players">
                                <Icon type="play-circle" /> Players
                            </MenuLink>

                            <Menu.Item>
                                <Icon type="picture" /> Assets
                            </Menu.Item>

                            <Menu.Item>
                                <Icon type="api" /> API
                            </Menu.Item>
                        </Menu>

                        <Menu className="menu-user" mode="horizontal">
                            <Menu.SubMenu className="menu-tenant" key="tenant" title={ <span><Icon type="shop" /> Tenant</span> }>
                                <Menu.Item>
                                    <Icon type="setting" /> Settings
                                </Menu.Item>
                                <Menu.Item>
                                    <Icon type="team" /> Users
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Layout.Header>
                );

                content = (
                    <div>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/elements/macros" component={ Macros } />
                        <Route exact path="/elements/services" component={ Services } />
                        <Route exact path="/elements/services/:id" component={ ServiceEdit } />
                        <Route exact path="/flows" component={ Flows } />
                        <Route exact path="/flows/:id/graph" component={ FlowGraph } />
                        <Route exact path="/players" component={ Players } />
                    </div>
                )
            } else {
                header = (
                    <Layout.Header className="header">
                        <Menu className="menu-main" mode="horizontal">
                            <Menu.Item>
                                <div className="brand">
                                    <img src={ logo } alt="Boomi Flow" />
                                </div>
                            </Menu.Item>
                        </Menu>

                        <ul className="ant-menu menu-user ant-menu-light ant-menu-root ant-menu-horizontal" mode="horizontal">
                            <li className="ant-menu-item" onClick={ this.onClickLogout } role="menuitem">
                                <Icon type="logout" /> Logout
                            </li>
                        </ul>
                    </Layout.Header>
                );

                content = <HomeTenantSelector />
            }

            return (
                <div className="App">
                    <BrowserRouter>
                        <Layout style={{ background: '#fff' }}>
                            { header }

                            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                                    { content }
                                </div>
                            </Layout.Content>
                        </Layout>
                    </BrowserRouter>
                </div>
            );
        }

        return <HomeLogin />
    }
}

const mapStateToProps = (state, dispatch) => {
    return {
        dispatch: dispatch,
        tenantToken: state.app.tenantToken,
        token: state.app.token
    }
};

export default connect(mapStateToProps)(AppContent);
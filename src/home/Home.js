import React, { Component } from 'react';
import HomeStates from "./HomeStates";
import HomeStatesByFlow from "./HomeStatesByFlow";
import { Tabs } from 'antd';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="All States" key="1">
                        <HomeStates />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="By Flow" key="2">
                        <HomeStatesByFlow />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="By # of Errors" key="3">

                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

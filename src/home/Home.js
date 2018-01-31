import React, { Component } from 'react';
import HomeStates from "./HomeStates";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>

                <HomeStates />
            </div>
        )
    }
}

import React from 'react';
import { Badge } from "antd";

const StateStatus = ({ state }) => {
    let statusType;
    let statusText;

    if (state.isExpired) {
        statusType = 'default';
        statusText = 'Expired';
    } else if (state.hasRootFaults) {
        statusType = 'error';
        statusText = 'Errored';
    } else if (state.isDone) {
        statusType = 'success';
        statusText = 'Done';
    } else {
        statusType = 'processing';
        statusText = 'In Progress';
    }

    return (
        <span>
            <Badge status={ statusType } text={ statusText } />
        </span>
    );
};

export default StateStatus;

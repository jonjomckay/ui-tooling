import React from 'react';

const formatUserEmail = (email) => {
    if (email) {
        return email;
    }

    return 'the public user';
};

const StateDescription = ({ state }) => {
    if (state.isExpired) {
        return (
            <span>
                No description is available for this state, as it expired at { state.expiresAt }.
            </span>
        )
    }

    return (
        <span>
            Currently on the <strong>{ state.currentMapElementDeveloperName }</strong> map element, in
            the <strong>{ state.currentFlowDeveloperName }</strong> flow, and the current running user
            is <strong>{ formatUserEmail(state.currentRunningUserEmail) }</strong>.
        </span>
    );
};

export default StateDescription;

import axios from 'axios';

class FlowGraphSource {
    static get(token, id) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/graph/flow/' + id, request);
    }
}

export default FlowGraphSource;

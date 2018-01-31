import axios from 'axios';

class FlowGraphSource {
    static get(token, id) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get('https://staging.manywho.com/api/draw/1/graph/flow/' + id, request);
    }
}

export default FlowGraphSource;

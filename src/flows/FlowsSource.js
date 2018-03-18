import axios from 'axios';

class FlowsSource {
    static list(token) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/flow', request);
    }
}

export default FlowsSource;

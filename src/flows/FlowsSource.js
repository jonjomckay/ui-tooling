import axios from 'axios';

class FlowsSource {
    static list(token) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get('https://flow.manywho.com/api/draw/1/flow', request);
    }
}

export default FlowsSource;
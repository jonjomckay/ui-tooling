import axios from 'axios';

class PlayersSource {
    static delete(token, name) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.delete(process.env.REACT_APP_BASE_URI + '/07f799a4-af7c-449b-ba7c-f1f526f7000a/play/' + name, request);
    }

    static get(token, name) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/07f799a4-af7c-449b-ba7c-f1f526f7000a/play/' + name, request);
    }

    static list(token) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/07f799a4-af7c-449b-ba7c-f1f526f7000a/play', request);
    }

    static save(token, name, content) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        const body = '=' + encodeURIComponent(content);

        return axios.post(process.env.REACT_APP_BASE_URI + '/07f799a4-af7c-449b-ba7c-f1f526f7000a/play/' + name, body, request);
    }
}

export default PlayersSource;

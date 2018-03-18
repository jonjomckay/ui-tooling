import axios from 'axios';

class ServiceSource {
    static get(token, id) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/element/service/' + id, request);
    }

    static getTypes(token, id) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/element/type', request)
            .then(response => response.data.filter(type => type.serviceElementId === id));
    }

    static list(token) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/element/service', request);
    }
}

export default ServiceSource;

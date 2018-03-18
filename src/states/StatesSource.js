import axios from 'axios';

class StatesSource {
    static get(token, id) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get(process.env.REACT_APP_BASE_URI + '/api/admin/1/states/' + id, request);
    }
}

export default StatesSource;

import axios from 'axios';

class HomeLoginSource {
    static listTenants(token) {
        return axios.get(process.env.REACT_APP_BASE_URI + '/api/admin/1/users/me', {
            headers: {
                'Authorization': token
            }
        });
    }

    static login(username, password) {
        return axios.post(process.env.REACT_APP_BASE_URI + '/api/draw/1/authentication', {
            username: username,
            password: password
        });
    }

    static loginTenant(token, id) {
        return axios.get(process.env.REACT_APP_BASE_URI + '/api/draw/1/authentication/' + id, {
            headers: {
                'Authorization': token
            }
        });
    }
}

export default HomeLoginSource;

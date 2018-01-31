import axios from 'axios';

class MacroSource {
    static list(token) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return axios.get('https://staging.manywho.com/api/draw/1/element/macro', request);
    }
}

export default MacroSource;

import { notification } from 'antd';

export default class Errors {
    static handleError(error) {
        const description = 'Check the console for more information';

        if (error.response) {
            if (error.response.data) {
                notification.error({
                    duration: 0,
                    message: error.response.data,
                    description: 'Please contact support@manywho.com if this persists'
                });
            } else {
                notification.error({
                    duration: 0,
                    message: error.message,
                    description: description
                });
            }
        } else if (error.request) {
            // The request was made but no response was received
            notification.error({
                duration: 0,
                message: 'There was an error sending the request',
                description: description
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            notification.error({
                duration: 0,
                message: error.message,
                description: description
            });
        }

        return Promise.reject(error);
    }
}
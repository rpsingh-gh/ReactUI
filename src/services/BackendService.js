import axios from 'axios';
import qs from 'qs';
import { variables } from '../components/Variables.jsx';


class BackendService {

    createUser(User) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/User/Create',
            data: User
        }).catch((error) => {

            this.handleErrors(error);

        });
    }
    deleteUser(id){
        return axios.delete(variables.API_URL + '/User/Delete?Id=' + id)
        .catch((error) => {
            this.handleErrors(error);

        });

    }


    getAllUser() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/User/GetAll', headers)
            .catch((error) => {e
                this.handleErrors(error);

            });
    }

    EditUser(User) {
        return axios({
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/User/Edit',
            data: User
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    handleErrors(error)
    {
        if (error.response) {
            console.log('Server response: ' + error.response.data);
            console.log('Server response status code: ' + error.response.status);
            console.log('Error:' + error.message);
        } else if (error.request) {
            console.log('Error while sending request to server: ' + error.request);
            console.log('Error:' + error.message);
        } else {
            console.log('Error:' + error.message);
        }
    }
    UserLogin(UserLogin) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL+ '/User/Login',
            data:UserLogin
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    GetUserdataByParameter(Parameter) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/User/getUserByParam',
            data:Parameter
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    GetAllProduct() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/Product/GetAll', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }

    UserAction(UserAction) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/User/userAction',
            data:UserAction
        }).catch((error) => {

            this.handleErrors(error);

        });
    }
    PasswordReset(userLogin) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/User/PasswordReset',
            data:userLogin
        }).catch((error) => {

            this.handleErrors(error);

        });
    }


}

export default new BackendService()
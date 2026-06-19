import axios from 'axios';
import qs from 'qs';
import { variables } from '../components/Variables';


class ProBackendService {

    GetAllProduct() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/Product/GetAll', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }

    CreateOrder(ProductOder) {
        console.log("server 3" + JSON.stringify(ProductOder))
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/Product/CreateOrder',
            data: ProductOder
        }).catch((error) => {

            this.handleErrors(error);

        });
    }
    getAllOrder() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/Order/GetAll', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }
    getOrderStatus() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/Order/getOrderStatus', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }
    getOrderItems(OrderID) {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(variables.API_URL + '/Order/getOrderItems?OrderID='+OrderID, headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }

    ProductSubmit(Product) {

        console.log('URL:' + variables.API_URL + '/Product/CreateProduct');
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: variables.API_URL + '/Product/CreateProduct',
            data: Product
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    handleErrors(error) {
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

}

export default new ProBackendService()
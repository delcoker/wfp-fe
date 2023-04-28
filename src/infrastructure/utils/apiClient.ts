import axios from 'axios';

const server_endpoint = process.env.NODE_ENV === "development" ?
    process.env.REACT_APP_DEV_BACKEND_API_URL :
    process.env.REACT_APP_USE_PROD_DOCKER_BACKEND === "true" ?
        process.env.REACT_APP_PROD_DOCKER_BACKEND_API_URL :
        process.env.REACT_APP_PROD_BACKEND_API_URL

console.log(server_endpoint)
console.log(process.env.NODE_ENV)

// Create the apiClient object with the headers
export const createApiClient = () => {
    return axios.create({
        baseURL: server_endpoint,
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                "Bearer " + localStorage.getItem('token')
        },
    });
}
// Create the initial apiClient object
let apiClient = createApiClient();

export const updateApiClientHeaders = (headers: any) => {
    apiClient = axios.create({
        baseURL: server_endpoint,
        headers: {
            ...apiClient.headers,
            ...headers,
        },
    });
};

export default apiClient;

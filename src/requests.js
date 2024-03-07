import axios from "axios"

const API_URL = 'https://auth-qa.qencode.com'

const authenticationApiAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': 'Bearer' + 'access_token'
    }
})

authenticationApiAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("Token is invalid");
        }
        return error
    },
);


export {authenticationApiAxios}
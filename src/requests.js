import axios from "axios"

const API_URL = 'https://auth-qa.qencode.com'

const authenticationApiAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': 'Bearer' + 'access_token'
    }
})


export {authenticationApiAxios}
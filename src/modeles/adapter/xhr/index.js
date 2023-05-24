import axios from "axios";

const API_DEV_URl = "http://172.20.10.2:5000/api/"
export function apiGet(url){

    return axios.get(`${API_DEV_URl}${url}`);
}

export function post(url, RequestData){

    return axios.post(`${API_DEV_URl}${url}`, RequestData);

}

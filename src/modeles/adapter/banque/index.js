import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('banques')
}

export function show(id){
    return apiGet(`banques/${id}`)
}

export function add(RequestData = {NumeroArrondissement}){
    return post('banques/add', RequestData)
}

export function sup(id){
    return post(`banques/delete`, id)
}

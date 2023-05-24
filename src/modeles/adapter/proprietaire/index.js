import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('proprietaires')
}

export function show(id){
    return apiGet(`proprietaires/${id}`)
}

export function showByAppartement(idAppartement){
    return apiGet(`proprietaires/Appartement/${idAppartement}`)
}

export function add(RequestData = {NumeroArrondissement}){
    return post('proprietaires/add', RequestData)
}

export function sup(id){
    return apiGet(`proprietaires/delete/${id}`)
}

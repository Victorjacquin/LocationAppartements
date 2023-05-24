import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('arrondissements')
}

export function show(id){
    return apiGet(`arrondissements/${id}`)
}

export function showByProprietaire(idProprietaire){
    return apiGet(`posseder/proprietaire/${idProprietaire}`)
}

export function add(RequestData = {NumeroArrondissement}){
    return post('arrondissements/add', RequestData)
}

export function sup(id){
    return get(`arrondissements/delete/${id}`)
}

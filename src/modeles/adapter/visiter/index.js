import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('arrondissements')
}

export function show(id){
    return apiGet(`arrondissements/${id}`)
}

export function showByIdClient(idclient){
    return apiGet(`visites/client/${idclient}`)
}

export function add(RequestData = {Date_Visite, NumeroClient, NumeroAppartement}){
    return post('visites/add', RequestData)
}

export function sup(idAppartement, idClient){
    return apiGet(`visites/delete/${idAppartement}/${idClient}`)
}

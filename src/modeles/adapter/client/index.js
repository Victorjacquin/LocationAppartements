import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('clients')
}

export function show(id){
    return apiGet(`clients/${id}`)
}

export function add(RequestData = {Nom, Prenom, Tel, Nom_Rue, Numero_Rue, Ville, CP}){
    return post('clients/add', RequestData)
}

export function sup(NumeroClient){
    return apiGet(`clients/delete/${NumeroClient}`)
}

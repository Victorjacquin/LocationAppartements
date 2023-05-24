import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('arrondissements')
}

export function show(id){
    return apiGet(`arrondissements/${id}`)
}

export function showByLocataire(idLocataire){
    return apiGet(`occuper/Locataire/${idLocataire}`)
}

export function add(RequestData = {NumeroAppartement, NumeroLocataire, Date_Debut,Date_Fin}){
    return post('occuper/add', RequestData)
}

export function sup(id){
    return get(`arrondissements/delete/${id}`)
}

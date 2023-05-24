import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('locataires')
}

export function show(id){
    return apiGet(`locataires/${id}`)
}

export function showByAppartement(idAppartement){
    return apiGet(`locataires/Appartement/${idAppartement}`)
}

export function add(RequestData = {Nom, Prenom, Tel, Date_Naissance, NumeroBanque,Numero_Compte_Bancaire}){
    return post('locataires/add', RequestData)
}

export function sup(id){
    return apiGet(`locataires/delete/${id}`)
}

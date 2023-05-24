import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('demandes')
}

export function show(id){
    return apiGet(`demandes/${id}`)
}

export function showByIdClient(idClient){
    return apiGet(`demandes/idclient/${idClient}`)
}

export function add(RequestData = {Date_Demande, Prix_min, Prix_max, NumeroClient, NumeroArrondissement, NumeroPays, NumeroVille, NumeroDepartement}){
    return post('demandes/add', RequestData)
}

export function sup(id){
    return apiGet(`demandes/delete/${id}`)
}

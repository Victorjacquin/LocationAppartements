import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('appartements')
}

export function show(id){
    return apiGet(`appartements/${id}`)
}

export function showLibre(){
    return apiGet(`appartements/libres`)
}

export function add(RequestData = {Rue,Num_Rue,Ville,CP,Prix_Location,Prix_Charge,Ascenseur,Preavis,Etage,NumeroTypeAppartement,Numero_Arrondissement, Taille}){
    return post('appartements/add', RequestData)
}

export function update(RequestData = {NumeroAppartement, Rue,Num_Rue,Ville,CP,Prix_Location,Prix_Charge,Ascenseur,Preavis,Etage,taille, NumeroTypeAppartement,NumeroArrondissement}){
    return post('appartements/update', RequestData)
}

export function sup(id){
    return post(`appartements/delete`,id)
}

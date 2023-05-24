import {apiGet, post} from "../xhr";

export function list(){
    return apiGet('villes')
}
import {IApi} from './Project.model'

export interface ISolicitanteData{
    id:string;
    name:string;
    lastname:string;
    phone:string;
    business:string;
    email:string
}
export interface ISolicitante extends IApi {
  content:ISolicitanteData[]
}

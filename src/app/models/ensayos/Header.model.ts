import {ICreateProjectDTO} from '../Project.model'
export interface IHeader{
  id:number
  tare_weight:number
  sample_weight:number
  muestra_id:number
}
export interface IHeaderDto extends Omit<IHeader,'id'>{
}
interface projectHeader extends ICreateProjectDTO {
  solicitante:string
}
export interface IHeaderValues {
  header:IHeaderDto
  project:projectHeader
}

import {ISolicitanteData} from './Solicitante.model'

export interface IProjectData {
  id:number;
  title: string,
  location:string
  reference:string
  probes?: number
  user_id:string
  solicitante_id:string
  solicitante?:ISolicitanteData
  date?:Date
}

export interface IApi{
  pageable: {
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    offset:number,
    pageSize: number,
    pageNumber:number,
    paged: boolean,
    unpaged: boolean
},
last: boolean,
totalElements: number,
totalPages: number,
size: number,
number:number,
sort: {
    empty: boolean,
    unsorted: boolean,
    sorted: boolean
},
first: boolean,
numberOfElements: number,
empty: boolean
}
export interface IProject extends IApi{
  content: IProjectData[]
}

export interface ICreateProjectDTO extends Omit<IProjectData, 'id'|'solicitante'> {}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { ICreateProjectDTO, IProject, IProjectData } from '@app/models/Project.model'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.API_URL + '/project';

  constructor (private http: HttpClient) { }

  get(page: number = 0, elements: number = 10,sortField:string="date", sortDirection:string="desc"): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiUrl}?page=${page}&elements=${elements}&sortBy=${sortField}&sortDirection=${sortDirection}`);
  }
  getById(id:string):Observable<IProjectData>{
    return this.http.get<IProjectData>(`${this.apiUrl}/${id}`);
  }
  getDetails(id:number=1,
    sondeoId:number=1,
    muestra:number=1):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}/details?probeId=${sondeoId}&muestraId=${muestra}`)
  }
  create(project: ICreateProjectDTO): Observable<IProjectData> {
    return this.http.post<IProjectData>(this.apiUrl, project);
  }
  update(project:IProjectData): Observable<IProjectData> {
    return this.http.put<IProjectData>(this.apiUrl, project);
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getMuestra(projectId: string, sondeoId: string, muestraId: string): Observable<{id:number}> {
    return this.http.get<{id:number}>(
      `${environment.API_URL}/muestra?projectId=${projectId}&probe=${sondeoId}&muestra=${muestraId}`
      );
  }
  createMuestra(muestra:  {muestra: number,sondeo_id: number}){
    return this.http.post(`${environment.API_URL}/muestra`,muestra);
  }
  getSondeo(projectId: number, sondeo: string): Observable<{id:number,muestras:number}> {
    return this.http.get<{id:number,muestras:number}>(
      `${environment.API_URL}/sondeo?projectId=${projectId}&probe=${sondeo}`
      );
  }
}

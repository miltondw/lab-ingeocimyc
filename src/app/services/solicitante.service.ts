import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import {ISolicitante,ISolicitanteData } from '@app/models/Solicitante.model'
@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  private apiUrl = environment.API_URL+'/solicitante';

  constructor (private http: HttpClient) { }

  get(page:number=0,elements:number=10,sortField?:string, sortDirection?:string): Observable<ISolicitante> {
    return this.http.get<ISolicitante>(`${this.apiUrl}?page=${page}&elements=${elements}&sortBy=${sortField}&sortDirection=${sortDirection} `);
  }
  getByName(name:string): Observable<ISolicitanteData[]>{
    return this.http.get<ISolicitanteData[]>(`${this.apiUrl}/name?nombre=${name}`);
  }
  getById(id:string): Observable<ISolicitanteData>{
    return this.http.get<ISolicitanteData>(`${this.apiUrl}/${id}`);
  }
  create(solicitante: ISolicitanteData): Observable<ISolicitanteData> {
    return this.http.post<ISolicitanteData>(this.apiUrl, solicitante);
  }
  update(solicitante:ISolicitanteData): Observable<ISolicitanteData> {
    return this.http.put<ISolicitanteData>(this.apiUrl, solicitante);
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import {IHeaderDto,IHeader} from '@app/models/ensayos/Header.model'
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = environment.API_URL + '/header';

  constructor (private http: HttpClient) { }

  get(idMuestra: string): Observable<IHeader> {
    return this.http.get<IHeader>(
      `${this.apiUrl}?&muestraId=${idMuestra}`
    );
  }

  create(humedadDto: IHeaderDto): Observable<IHeader> {
    return this.http.post<IHeader>(this.apiUrl, humedadDto);
  }

  update(humedadDto: IHeaderDto): Observable<IHeader> {
    return this.http.put<IHeader>(this.apiUrl, humedadDto);
  }
}

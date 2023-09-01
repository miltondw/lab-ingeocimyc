import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { IHumedad,IHumedadDto } from '@app/models/ensayos/Humedad.model'
@Injectable({
  providedIn: 'root'
})
export class HumedadService {
  private apiUrl = environment.API_URL + '/humedad';

  constructor (private http: HttpClient) { }

  get(idMuestra: string): Observable<IHumedad> {
    return this.http.get<IHumedad>(
      `${this.apiUrl}?&muestraId=${idMuestra}`
    );
  }

  create(humedadDto: IHumedadDto): Observable<IHumedad> {
    return this.http.post<IHumedad>(this.apiUrl, humedadDto);
  }

  update(humedadDto: IHumedadDto): Observable<IHumedad> {
    return this.http.put<IHumedad>(this.apiUrl, humedadDto);
  }
}

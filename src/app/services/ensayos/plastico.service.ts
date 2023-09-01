import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { IPlastico,IPlasticoDto} from '@app/models/ensayos/Plastico.model'

@Injectable({
  providedIn: 'root'
})
export class PlasticoService {

  private apiUrl = environment.API_URL + '/plastico';

  constructor (private http: HttpClient) { }

  get(idMuestra: string): Observable<IPlastico> {
    return this.http.get<IPlastico>(
      `${this.apiUrl}?&muestraId=${idMuestra}`
    );
  }

  create(plasticoDto: IPlasticoDto): Observable<IPlastico> {
    return this.http.post<IPlastico>(this.apiUrl, plasticoDto);
  }
  update(plasticoDto: IPlasticoDto): Observable<IPlastico> {
    return this.http.put<IPlastico>(this.apiUrl, plasticoDto);
  }
}

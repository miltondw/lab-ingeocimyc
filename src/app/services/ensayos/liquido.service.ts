import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { ILiquido,ILiquidoDto } from '@app/models/ensayos/Liquido.model'

@Injectable({
  providedIn: 'root'
})
export class LiquidoService {

  private apiUrl = environment.API_URL + '/liquido';

  constructor (private http: HttpClient) { }

  get(idMuestra: string): Observable<ILiquido[]> {
    return this.http.get<ILiquido[]>(
      `${this.apiUrl}?&muestraId=${idMuestra}`
    );
  }

  create(liquidoDto: ILiquidoDto): Observable<ILiquido> {
    return this.http.post<ILiquido>(this.apiUrl, liquidoDto);
  }
  update(liquidoDto: ILiquidoDto): Observable<ILiquido> {
    return this.http.put<ILiquido>(this.apiUrl, liquidoDto);
  }
}

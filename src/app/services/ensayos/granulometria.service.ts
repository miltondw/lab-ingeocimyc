import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { IEnsayoGranulometriaDTO, IGranulometria } from '@app/models/ensayos/Granulometria.model'

@Injectable({
  providedIn: 'root'
})
export class GranulometriaService {

  private apiUrl = environment.API_URL + '/granulometria';

  constructor (private http: HttpClient) { }

  get(idMuestra: string): Observable<IGranulometria> {
    return this.http.get<IGranulometria>(
      `${this.apiUrl}?&muestraId=${idMuestra}`
    );
  }

  create(granulometriaDto: IEnsayoGranulometriaDTO,total?:number): Observable<IGranulometria> {
    const granulometria=this.granulometriOperation(granulometriaDto,total)

    return this.http.post<IGranulometria>(this.apiUrl, granulometria);
  }

  update(granulometriaDto: IEnsayoGranulometriaDTO,sucs:boolean=false,total?:number): Observable<IGranulometria> {
    let granulometria:IEnsayoGranulometriaDTO;
    if(!sucs){
      granulometria=this.granulometriOperation(granulometriaDto,total)
    }else{
      granulometria=granulometriaDto
    }
    return this.http.put<IGranulometria>(this.apiUrl, granulometria);
  }

  granulometriOperation(granulometriaDto: IEnsayoGranulometriaDTO,total?:number){
    const tamices: number[] = Object.values(granulometriaDto.tamices)
    //Total=sampleWeight-tareWeightH-(sampleWeight-(humidity/100))
    const totalSum=tamices.reduce((dc: number, va: number) => dc + va, 0)
    console.log(totalSum,'totalSum',total,'total')
    const retenido = tamices.map((tamice) => {
        if(total){
      const retenido = ((tamice / total) * 100)
      return Number(retenido.toFixed(2))}
      else{
            return 0;
      }
    })
    const acum = [0]
    for (let i = 1; i < retenido.length; i++) {
      const porcentajeacum = Number((retenido[i] + acum[i - 1]).toFixed(2));
      acum.push(porcentajeacum);
    }
    const pasa = acum.map((ac: number) => {
      const pasa = Number((100 - ac).toFixed(2))
      return pasa
    })
    const subRetenido = retenido.slice(0, 6)
    const grava = subRetenido.reduce((ac: number, va: number) => ac + va, 0)
    const subRetenido2 = retenido.slice(6, 9)
    const arena = subRetenido2.reduce((ac: number, va: number) => ac + va, 0)
    const finos = pasa[pasa.length - 2]
    const granulometria: IGranulometria = {
      tamices: JSON.stringify(granulometriaDto.tamices),
      muestra_id: Number(granulometriaDto.muestra_id),
    };
    granulometria.acum = acum;
    granulometria.arena = arena;
    granulometria.finos = finos;
    granulometria.grava = grava;
    granulometria.pasa = pasa;
    granulometria.retenido = retenido;
    granulometria.total = total;
    return granulometria;
  }

}

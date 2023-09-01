import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  private idProject = new BehaviorSubject<string | null>(null);
  private sondeo = new BehaviorSubject<string | null>(null);
  private muestra = new BehaviorSubject<string | null>(null);
  private muestraProject = new BehaviorSubject<string | null>(null);


  constructor() { }

  idProject$ = this.idProject.asObservable()
  sondeo$ = this.sondeo.asObservable()
  muestra$ = this.muestra.asObservable()
  muestraProject$ = this.muestraProject.asObservable()

  setIdProject(project: string) {
    this.idProject.next(project);
  }
  setSondeo(sondeo: string) {
    this.sondeo.next(sondeo);
  }
  setMuestra(muestra: string ) {
   this.muestra.next(muestra);
  }
  setMuestraProject(muestra: string ) {
   this.muestraProject.next(muestra);
  }

}

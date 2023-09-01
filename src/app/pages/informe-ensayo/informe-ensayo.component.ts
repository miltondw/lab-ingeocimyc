import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@app/services/project.service';
import { GranulometriaService } from '@app/services/ensayos/granulometria.service';
import { RouterStateService } from '@app/services/router-state.service'
import { SavePdfService } from '@app/services/save-pdf.service';
import { FormControl } from '@angular/forms';
import { DATA_LIQUIDO, DATA_PLASTICO, DATA_GRANULOMETRIA } from './data';
import {IInforme} from '@app/models/Informe.model';
import { IEnsayoGranulometriaDTO } from '@app/models/ensayos/Granulometria.model';
@Component({
  selector: 'app-informe-ensayo',
  templateUrl: './informe-ensayo.component.html',
  styleUrls: ['./informe-ensayo.component.sass']
})
export class InformeEnsayoComponent {
  id: string | null = null;
  projectData = {} as any;
  columnsLiquido: string[] = ['prueba', '1', '2', '3'];
  dataLiquido = DATA_LIQUIDO;
  columnsPlastico: string[] = ['prueba', '1', '2'];
  dataPlastico = DATA_PLASTICO;
  columnsGranulometria: string[] = [
    'pulgada',
    'mm',
    'gr',
    'retenido',
    'acum',
    'pasa',
  ];
  dataGranulometria = DATA_GRANULOMETRIA;
  sucsData: FormControl = new FormControl<string>("");
  sucs = false;
  sondeo: string | null = '1'
  muestra: string | null = '1'
  project_id: string | null = '1'
  muestras:any[]=[]
  dataInforme:IInforme[]|any=[]
  // loading:Observable<boolean> = this.savePdfService.loading$;
  //loading=false
  constructor (
    private routerStateService: RouterStateService,
    private projectService: ProjectService,
    private granulometriaService:GranulometriaService,
    private route: ActivatedRoute,
    private savePdfService: SavePdfService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsRoute) => {
      this.project_id = paramsRoute.get('id')
      this.project_id && this.projectService.getById(this.project_id).subscribe({
        next: (data) => {
          this.projectData = data
          for (let i = 1; i <= this.projectData.probes; i++) {
            this.projectService.getSondeo(Number(this.project_id), String(i))
              .subscribe({
                next: (data) => {
                  this.muestras.push(data);
                   for (let j = 1; j <= data.muestras; j++) {
                  this.projectService.getDetails(Number(this.project_id),i,j).subscribe({
                     next: (data) => {
                        if(data.length>0){
                          data[2].liquido.sort((a:any, b:any) => b.numeroPruebaEL - a.numeroPruebaEL)
                          data[1].plastico.sort((a:any, b:any) => b.numeroPrueba - a.numeroPrueba)
                          //console.log(data)
                          this.dataInforme.push(data)
                          function compararObjetos(a:any, b:any) {
                                // Primero, comparamos por 'sondeo'
                                  if (a[0].header.probe < b[0].header.probe) return -1;
                                  if (a[0].header.probe > b[0].header.probe) return 1;
                                  // Si 'sondeo' es igual, comparamos por 'muestra'
                                  if (a[0].header.muestra < b[0].header.muestra) return -1;
                                  if (a[0].header.muestra > b[0].header.muestra) return 1;
                                  // Si 'muestra' también es igual, puedes agregar más reglas de comparación si es necesario.
                                 return 0; // Son iguales en todos los aspectos
                            }
                             this.dataInforme.sort(compararObjetos);
                        }
                     },
                     error: (error) => {
                       console.error('Error :', error);
                     }
                  });
                }
                },
                error: (error) => {
                  console.error('Error :', error);
                }
              });
          }

        },
        error: (error) => {
          console.error('Error :', error);
        }
      })
    });
    this.route.queryParamMap
      .subscribe(params => {
        this.sondeo = params.get('sondeo')
        this.muestra = params.get('muestra')
      });
  }
  sucsActive() {
    this.sucs = !this.sucs
  }
  saveSucs(sondeo: number, muestra: number,muestra_id:number) {
    if(this.project_id){
      let granulometriaData:IEnsayoGranulometriaDTO|any={}
      console.log()
      this.granulometriaService.get(String(muestra_id)).subscribe({
        next: (data) => {
          granulometriaData=data
          granulometriaData.sucs_data=this.sucsData.value
         this.granulometriaService.update(granulometriaData,true).subscribe({
           next: (data) => {
           console.log(data)
           },
           error: (error) => {
             console.error('Error :', error);
  }});
        },
        error: (error) => {
          console.error('Error :', error);
        }
     });
      this.sucs=false
     }
  }
  generatePDF() {
    const pdf={
    title:this.projectData.title,
    data:this.dataInforme
    }
    this.savePdfService.save(pdf)
  }
}

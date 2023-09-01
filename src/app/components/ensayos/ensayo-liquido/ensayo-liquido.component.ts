import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterStateService } from '@app/services/router-state.service'
import { LiquidoService } from '@app/services/ensayos/liquido.service'
import { ILiquido } from '@app/models/ensayos/Liquido.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'
import * as regression from 'regression';
import { from } from 'rxjs';
import { concatMap, catchError, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-ensayo-liquido',
  templateUrl: './ensayo-liquido.component.html',
  styleUrls: ['./ensayo-liquido.component.sass']
})
export class EnsayoLiquidoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda',
    'tercera'
  ];
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values: ILiquido[] | any = [];
  datos: ILiquido[] | any = [];
  stringValues: string[] = ["primera", "segunda", "tercera"]
  muestra_id: string = '1'
  edit = false
  new = true
  limite_liquido:number=0
  numeroDeGolpes:number[]=[]
  porcentajeHumedad:number[]=[]
  initialValues = {
    number_of_strokes: [''],
    tare_number: [''],
    tare_weight: ['',],
    tare_plus_wet_soil_weight: [''],
    tare_plus_dry_soil: [''],
    water_weight: [''],
    dry_soil_weight: [''],
    humidity: [''],
  }
  constructor (
    private fb: FormBuilder,
    private liquidoService: LiquidoService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        if(id) this.muestra_id = id
        id && this.initial(id)
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }
  initial(id:string){
    this.liquidoService.get(id).subscribe({
      next: (data) => {
        data.sort((a, b) => a.numero_prueba - b.numero_prueba);
        this.datos = data
        const liquido: any = {}
        if (this.datos[0]) {
          this.stringValues.map((stringValue, i) => {
        //      console.log(i,stringValue,this.datos[i])
            liquido[stringValue] = this.datos[i]
             liquido[stringValue].id = this.datos[i].id
          })
          this.form.patchValue(liquido)
          this.values = liquido
          this.new = false;
          this.edit = true;
        }else{
          this.form.reset()
          this.form.patchValue({})
          this.edit=false
          this.new=true;
          this.values={}
        }
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      segunda: this.fb.group(this.initialValues),
      tercera: this.fb.group(this.initialValues),
    });
  }
  onSubmit() {
    if (this.form.valid) {
        this.values = this.form.value
        this.calculate(this.stringValues, this.values, this.muestra_id)
        const liquidoDto = []

        const golpes = this.numeroDeGolpes;
        const humedad = this.porcentajeHumedad;
        const result = regression.linear(golpes.map((value, index) => [value, humedad[index]]));
        const [beta1, beta0] = result.equation;
        const tendencia = beta0 + beta1 * 25;
        this.limite_liquido =tendencia
        this.values.primera.limite_liquido=this.limite_liquido.toFixed(2)
        liquidoDto.push(this.values.primera, this.values.segunda, this.values.tercera)
        if (this.new) {
          const liquidoDtoWithIndex2 = liquidoDto.map((liquido, index) => ({ liquido, index }));
          from(liquidoDtoWithIndex2).pipe(
            concatMap(({ liquido, index }) => {
              return this.liquidoService.create(liquido).pipe(
                catchError(error => {
                  console.error(`Error en solicitud ${index + 1}:`, error);
                  return [];
                }),
                finalize(() => {
                  // Esto se ejecutará después de cada solicitud
                  if (index === liquidoDtoWithIndex2.length - 1) {
                    // Esta es la última solicitud, puedes realizar acciones finales aquí
                    this.edit = true;
                     this.initial(this.muestra_id)
                  }
                })
              );
            })
          ).subscribe();
        } else {
          this.edit = true
          const liquidoDtoWithIndex = liquidoDto.map((liquido, index) => ({ liquido, index }));

          from(liquidoDtoWithIndex).pipe(
            concatMap(({ liquido, index }) => {
              return this.liquidoService.update(liquido).pipe(
                catchError(error => {
                  console.error(`Error en solicitud ${index + 1}:`, error);
                  return [];
                }),
                finalize(() => {
                  // Esto se ejecutará después de cada solicitud
                  if (index === liquidoDtoWithIndex.length - 1) {
                    // Esta es la última solicitud, puedes realizar acciones finales aquí
                    this.edit = true;
                    this.initial(this.muestra_id)
                  }
                })
              );
            })
          ).subscribe();
          // liquidoDto.map(liquido => {
          //   this.liquidoService.update(liquido).subscribe({
          //     next: () => {
          //       this.edit = true
          //     },
          //     error: (error) => {
          //       console.error('Error :', error);
          //     }
          //   });
          // })
        }
    } else {
      this.form.markAllAsTouched()
    }
  }
  calculate(stringValues: string[] | any, values: ILiquido[] | any, muestra_id: string) {
    stringValues.map((stringValue: string, i: number) => {
      if (values[stringValue].tare_weight
        && values[stringValue].tare_plus_dry_soil
        && values[stringValue].tare_plus_wet_soil_weight
      ) {
        const valuesPesos = waterSoilHumidity(
          values[stringValue].tare_weight,
          values[stringValue].tare_plus_dry_soil,
          values[stringValue].tare_plus_wet_soil_weight
        )
        values[stringValue].dry_soil_weight = valuesPesos.pesoSuelo
        values[stringValue].water_weight = valuesPesos.pesoAgua
        values[stringValue].humidity = valuesPesos.humedad
      }
      values[stringValue].muestra_id = muestra_id
      if(!this.new){
        values[stringValue].id = this.datos[this.datos[i].numero_prueba - 1].id
       }
        values[stringValue].numero_prueba = i + 1
      console.log(i,values)
      this.numeroDeGolpes.push(values[stringValue].number_of_strokes)
      this.porcentajeHumedad.push(values[stringValue].humidity)
    })

  }
  activeEdit() {
    this.edit = false
  }

}

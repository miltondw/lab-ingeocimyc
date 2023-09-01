import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlasticoService } from '@app/services/ensayos/plastico.service'
import { RouterStateService } from '@app/services/router-state.service'
import { IPlastico } from '@app/models/ensayos/Plastico.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'

@Component({
  selector: 'app-ensayo-plastico',
  templateUrl: './ensayo-plastico.component.html',
  styleUrls: ['./ensayo-plastico.component.sass']
})
export class EnsayoPlasticoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda'
  ];
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values: IPlastico[] | any = [];
  datos: IPlastico[] | any = [];
  stringValues = ["primera", "segunda"]
  muestra_id: string = '1'
  edit = false
  new = true
  initialValues = {
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
    private plasticoService: PlasticoService,
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
    this.plasticoService.get(id).subscribe({
      next: (data) => {
        this.datos = data
        const plastico: any = {}
        if (this.datos[0]) {
          this.stringValues.map((stringValue, i) => {
            plastico[stringValue] = this.datos[this.datos[i].numero_prueba - 1]
            plastico[stringValue].id = this.datos[this.datos[i].numero_prueba - 1].id
          })
          this.form.patchValue(plastico)
          this.values = plastico
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
      segunda: this.fb.group(this.initialValues)
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.calculate(this.stringValues, this.values, this.muestra_id)
        const plasticoDto = []
        plasticoDto.push(this.values.primera, this.values.segunda)
        if (this.new ) {
          plasticoDto.map((plastico,i) => {
            this.plasticoService.create(plastico).subscribe({
              next: () => {
                this.edit = true
                  this.new=false
                  this.initial(this.muestra_id)
              },
              error: (error) => {
                console.error('Error :', error);
              }
            });
          })
        } else {
          this.edit = true
      //    console.log("update", plasticoDto)
          plasticoDto.map(plastico => {
            this.plasticoService.update(plastico).subscribe({
              next: () => {
                this.edit = true

              },
              error: (error) => {
                console.error('Error :', error);
              }
            });
          })
        }
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  calculate(stringValues: string[] | any, values: IPlastico[] | any, muestra_id: string) {
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
      values[stringValue].numero_prueba = i + 1
      if(!this.new) values[stringValue].id = this.datos[this.datos[i].numero_prueba - 1].id
    })

  }
  activeEdit() {
    this.edit = false
  }
}

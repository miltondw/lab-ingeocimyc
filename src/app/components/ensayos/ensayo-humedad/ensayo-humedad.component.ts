import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ELEMENT_DATA } from './data'
import { RouterStateService } from '@app/services/router-state.service'
import { HumedadService } from '@app/services/ensayos/humedad.service'
import { IHumedadDto } from '@app/models/ensayos/Humedad.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'

@Component({
  selector: 'app-ensayo-humedad',
  templateUrl: './ensayo-humedad.component.html',
  styleUrls: ['./ensayo-humedad.component.sass']
})
export class EnsayoHumedadComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
  ];
  dataSource: Object[] = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values: IHumedadDto|any = {};
  edit: boolean = false;
  depth: string = ''
  new: boolean = true;
  muestra_id='1'
  constructor (
    private fb: FormBuilder,
    private humedadService: HumedadService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        if (id) this.muestra_id = id
        id && this.initial(id)
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }
  initial(id:string){
    this.humedadService.get(id).subscribe({
      next: (data) => {
       this.muestra_id=id
        if (data?.tare_weight > 0) {
          this.edit = true;
          const depth=data.depth
          this.values = data
          if(data.cylinder){
            this.values.cylinder={}
            this.values.cylinder.diameter=data.cylinder[0]
            this.values.cylinder.height=data.cylinder[1]
          }
          this.values.depth={}
          this.values.depth.de=depth[0]
          this.values.depth.hasta=depth[1]
          this.new = false;
          this.form.patchValue(this.values)
          this.values.depth=Object.values(this.values.depth)
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
      tare_weight: [''],
      tare_plus_wet_soil_weight: ['',],
      tare_plus_dry_soil: [''],
      dry_soil_weight: [''],
      water_weight: [''],
      humidity: [''],
      depth: this.fb.group({
        de: [''],
        hasta: [''],
      }),
      cylinder: this.fb.group({
        diameter: [''],
        height: [''],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      this.values.depth=Object.values(this.values.depth)
      this.values.cylinder=Object.values(this.values.cylinder)
      this.calculate(this.values,this.muestra_id)
      if (this.new) {
        this.humedadService.create(this.values).subscribe({
          next: () => {
            this.edit = true
            this.new=false
            this.initial(this.muestra_id)
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      } else {
        this.humedadService.update(this.values).subscribe({
          next: () => {
            this.edit = true
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  calculate(values: IHumedadDto[] | any, muestra_id: string) {
    if (values.tare_weight
      && values.tare_plus_dry_soil
      && values.tare_plus_wet_soil_weight
    ) {
      const valuesPesos = waterSoilHumidity(
        values.tare_weight,
        values.tare_plus_dry_soil,
        values.tare_plus_wet_soil_weight
      )
      values.dry_soil_weight = valuesPesos.pesoSuelo
      values.water_weight = valuesPesos.pesoAgua
      values.humidity = valuesPesos.humedad
    }
    values.muestra_id = muestra_id

  }
  activeEdit() {
    this.edit = false
  }
}



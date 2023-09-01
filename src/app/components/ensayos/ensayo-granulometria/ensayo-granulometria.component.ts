import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnsayoGranulometriaDTO } from '@app/models/ensayos/Granulometria.model'
import { GranulometriaService } from '@app/services/ensayos/granulometria.service'
import { HeaderService } from '@app/services/ensayos/header.service'
import { HumedadService } from '@app/services/ensayos/humedad.service'
import { RouterStateService } from '@app/services/router-state.service'

@Component({
  selector: 'app-ensayo-granulometria',
  templateUrl: './ensayo-granulometria.component.html',
  styleUrls: ['./ensayo-granulometria.component.sass']
})

export class EnsayoGranulometriaComponent {
  displayedColumns: string[] = [
    'pulgada',
    'mm',
    'gr'
  ];
  dataSource = ELEMENT_DATA;
  values: IEnsayoGranulometriaDTO | any = {}
  form: FormGroup = new FormGroup({});
  edit: boolean = false;
  new: boolean = true;
  muestraId = '1';
  tare_weight = 0;
  sample_weight = 0;
  total = 0;
  constructor (
    private fb: FormBuilder,
    private granulometriaService: GranulometriaService,
    private humedadService: HumedadService,
    private headerService: HeaderService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        if (id) this.muestraId = id;
        id && this.initial(id)
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }
  initial(id:string){
    this.granulometriaService.get(id).subscribe({
      next: (data) => {
        if (typeof data?.tamices === 'string' && data?.tamices) {
          this.form.patchValue(JSON.parse(data.tamices))
          this.edit = true;
          this.values.tamices = this.form.value
          this.values.muestra_id = this.muestraId;
          this.new = false;
        } else {
          this.form.reset()
          this.form.patchValue({})
          this.edit = false
          this.new = true;
          this.values = {}
        }
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }
  private buildForm() {
    this.form = this.fb.group({
      inches2: [''],
      inches1: [''],
      inches34: ['',],
      inches12: [''],
      inches38: [''],
      inchesN4: [''],
      inchesN10: [''],
      inchesN40: [''],
      inchesN200: [''],
      inchesP200: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.values.tamices = this.form.value
      this.values.muestra_id = this.muestraId;
      for (let propiedad in this.values.tamices) {
        if (this.values.tamices[propiedad] === null) {
          this.values.tamices[propiedad] = 0;
        }
      }
      this.headerService.get(this.muestraId).subscribe({
        next: (data) => {
          this.tare_weight = data.tare_weight
          this.sample_weight = data.sample_weight
          this.humedadService.get(this.muestraId).subscribe({
            next: (data) => {
              this.total = this.sample_weight - this.tare_weight - (this.sample_weight * (data.humidity / 100))
              if (this.new) {
                this.granulometriaService.create(this.values, this.total).subscribe({
                  next: () => {
                    this.edit = true
                    this.initial(this.muestraId)
                  },
                  error: (error) => {
                    console.error('Error :', error);
                  }
                });
              } else {
                this.granulometriaService.update(this.values, false, this.total).subscribe({
                  next: () => {
                    this.edit = true
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
        },
        error: (error) => {
          console.error('Error :', error);
        }
      });

    } else {
      this.form.markAllAsTouched()
    }
  }
  activeEdit() {
    this.edit = false
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterStateService } from '@app/services/router-state.service'
import { Router } from '@angular/router'
import { IHeaderValues } from '@app/models/ensayos/Header.model'
import { IProject } from '@app/models/Project.model'
import { HeaderService } from '@app/services/ensayos/header.service'
import { ProjectService } from '@app/services/project.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  form: FormGroup = new FormGroup({});
  project: IProject | any = {}
  values: IHeaderValues | any = {}
  edit: boolean = true;
  depth: string = ''
  new: boolean = true;
  muestra_id = '1'
  sondeo_id = 1
  sondeo: string = '1'
  muestra: string = '1'
  muestras:number=1
  constructor (
    private fb: FormBuilder,
    private routerStateService: RouterStateService,
    private headerService: HeaderService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.buildForm()
  }

  ngOnInit() {
    this.routerStateService.muestra$.subscribe({
      next: (id) => {
        if (id) this.muestra = id
        this.routerStateService.muestraProject$.subscribe({
          next: (id) => {
            if(id!==null) this.muestra_id = id
            id && this.initial(id)
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
        this.routerStateService.idProject$.subscribe({
          next: (id) => {
            id && this.projectService.getById(id).subscribe({
              next: (data) => {
                this.project = data
                this.routerStateService.sondeo$.subscribe({
                  next: (id) => {
                    if (id) this.sondeo = id
                    this.projectService.getSondeo(this.project.id, this.sondeo)
                      .subscribe({
                        next: (data) => {
                          this.sondeo_id = data.id
                          this.muestras=data.muestras
                        },
                        error: (error) => {
                          console.error('Error :', error);
                        }
                      })
                  },
                  error: (error) => {
                    console.error('Error :', error);
                  }
                })

              },
              error: (error) => {
                console.error('Error :', error);
              }
            })
          },
          error: (error) => {
            console.error('Error :', error);
          }
        })
      },
      error: (error) => {
        console.error('Error :', error);
      }
    })
  }
  initial(id:string){
    this.headerService.get(id).subscribe({
      next: (data) => {
        if (data !== null) {
          this.edit = false;
          this.form.patchValue(data)
          this.values = this.form.value
          this.new = false;
        }else{
          this.form.reset()
          this.form.patchValue({})
          this.edit=true
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
      sample_weight: [''],
    })
  }

  save() {
    this.values = this.form.value
    this.values.muestra_id = this.muestra_id
    if (this.new) {
      this.headerService.create(this.values).subscribe({
        next: () => {
          this.edit = false
          this.initial(this.muestra_id)
        },
        error: (error) => {
          console.error('Error :', error);
        }
      });
    } else {
      this.headerService.update(this.values).subscribe({
        next: () => {
          this.edit = false
        },
        error: (error) => {
          console.error('Error :', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save()
    } else {
      this.form.markAllAsTouched()
    }
  }

  onActiveEdit() {
    this.edit = true
  }
  onCreateMuestra() {
    const muestra = {
      muestra: this.muestras + 1,
      sondeo_id: this.sondeo_id
    }
    this.projectService.createMuestra(muestra).subscribe({
      next: () => {
        const queryParams = {
          sondeo: this.sondeo,
          muestra: muestra.muestra
        };
        this.initial(this.muestra_id)
        this.router.navigate([`/lab/ensayo/${this.project.id}`], { queryParams });
      },
      error: (error) => {
        console.error('Error :', error);
      }
    })
  }
  getMuestrasArray(): number[] {
    return Array.from({ length: this.muestras }, (_, index) => index + 1);
  }
  getSondeosArray(): number[] {
    return Array.from({ length: this.project.probes }, (_, index) => index + 1);
  }

  navigateToEnsayo(muestra: number): void {
    const queryParams = {
      sondeo: this.sondeo,
      muestra: muestra
    };
    this.router.navigate([`/lab/ensayo/${this.project.id}`], { queryParams });
  }
  navigateToSondeo(sondeo: number): void {
    const queryParams = {
      sondeo: sondeo,
      muestra: 1
    };
    this.router.navigate([`/lab/ensayo/${this.project.id}`], { queryParams });
  }

}

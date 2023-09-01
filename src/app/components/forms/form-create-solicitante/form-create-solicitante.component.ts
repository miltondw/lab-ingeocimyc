import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ISolicitanteData} from '@app/models/Solicitante.model'
import {SolicitanteService} from '@app/services/solicitante.service'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-form-create-solicitante',
  templateUrl: './form-create-solicitante.component.html',
  styleUrls: ['./form-create-solicitante.component.sass']
})
export class FormCreateSolicitanteComponent {
  form: FormGroup = new FormGroup({});
  values:ISolicitanteData|any= {};
  solicitante:ISolicitanteData|any= {};
  project_id: string | null = null;
  constructor (
    private fb: FormBuilder,
    private solicitanteService:SolicitanteService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsRoute) => {
      this.project_id = paramsRoute.get('id')
      this.project_id && this.solicitanteService.getById(this.project_id).subscribe({
        next: (data) => {
          this.solicitante = data
          if (data !== null) {
            this.form.patchValue(data)
            this.values = this.form.value
          } else {
            this.form.reset()
            this.form.patchValue({})
            this.values = {}
          }
        },
        error: (error) => {
          console.error('Error :', error);
        }
      })
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      business: [''],
      email: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formsValue:ISolicitanteData|any= this.form.value
      this.values=this.form.value
      for (const key in formsValue) {
      if (this.values?.hasOwnProperty(key)) {
        this.values[key] = formsValue[key].toLowerCase();
        }
      }
      if (this.values && !this.project_id) {
        this.solicitanteService.create(this.values).subscribe({
          next: () => {
            this.router.navigate(['/lab/list/solicitantes'])
          },
          error: (error) => {
            alert("Error")
            console.error('Error al obtener proyectos:', error);
          }
        });
      }else {
        this.solicitanteService.update(this.values).subscribe({
          next: (data) => {
            console.log(data)
            this.router.navigate([`/lab/list/solicitantes`]);

          },
          error: (error) => {
            console.error('Error al obtener proyectos:', error);
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}

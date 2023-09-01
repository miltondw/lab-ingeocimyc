import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateProjectDTO, IProject, IProjectData } from '@app/models/Project.model'
import { ISolicitanteData } from '@app/models/Solicitante.model'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProjectService } from '@app/services/project.service'
import { SolicitanteService } from '@app/services/solicitante.service'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.sass']
})
export class FormCreateProjectComponent {
  form: FormGroup = new FormGroup({});
  values: ICreateProjectDTO | any = {};
  projects: IProjectData[] | any = {};
  project: IProjectData | any = {}
  solicitantes: ISolicitanteData[] = [];
  searchSubject = new Subject<string>();
  selectedSolicitante: string = '';
  project_id: string | null = null;

  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private solicitanteService: SolicitanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm()
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.searchSolicitante(value);
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsRoute) => {
      this.project_id = paramsRoute.get('id')
      this.project_id && this.projectService.getById(this.project_id).subscribe({
        next: (data) => {
          this.project = data
          if (data !== null) {
            this.form.patchValue(data)
            this.values = this.form.value
            this.selectedSolicitante = data.solicitante_id
            data.solicitante && this.solicitantes.push(data.solicitante)
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

    this.projectService.get().subscribe({
      next: (data: IProject) => {
        this.projects = data.content;
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      reference: ['', Validators.required],
      probes: [''],
      solicitante_id: ['', Validators.required]
    });
  }
  solicitanteName(event: Event) {
    const e = event.target as HTMLInputElement;
    this.searchSubject.next(e.value);
  }
  searchSolicitante(value: string) {
    this.solicitanteService.getByName(value).subscribe({
      next: (data) => {
        this.solicitantes = data;
        this.selectedSolicitante = data[0].id;
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formsValue: ICreateProjectDTO | any = this.form.value
      this.values = this.form.value
      for (const key in formsValue) {
        if (this.values?.hasOwnProperty(key) && key !== 'probes' && key !== 'solicitante_id') {
          this.values[key] = formsValue[key].toLowerCase().trim();
        }
      }
      if (!this.values?.probes) {
        this.values.probes = 1
      }
      if (!this.project_id) {
        if (this.values) {
          this.values.user_id = 'admin';
          this.values.date = new Date()
          this.projectService.create(this.values).subscribe({
            next: (data) => {
              const queryParams = {
                sondeo: '1',
                muestra: '1'
              };
              this.router.navigate([`/lab/ensayo/${data.id}`], { queryParams });
            },
            error: (error) => {
              console.error('Error al obtener proyectos:', error);
            }
          });
        }
      } else {
        this.values.id = this.project.id
        this.values.date = this.project.date
        this.projectService.update(this.values).subscribe({
          next: (data) => {
            console.log(data)
            this.router.navigate([`/lab/list/proyectos`]);

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

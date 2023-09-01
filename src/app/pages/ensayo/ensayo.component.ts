import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterStateService } from '@app/services/router-state.service'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.component.html',
  styleUrls: ['./ensayo.component.sass']
})
export class EnsayoComponent {
  projectId: string | null = null;
  sondeo: string | null = null;
  muestra: string | null = null;
  constructor (
    private route: ActivatedRoute,
    private routerStateService: RouterStateService,
    private projectService: ProjectService
  ) { }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramsRoute) => {
        this.projectId = paramsRoute.get('id')
      });
    this.route.queryParamMap
      .subscribe(params => {
        this.sondeo = params.get('sondeo')
        this.muestra = params.get('muestra')
        if (this.projectId && this.sondeo && this.muestra) {
          this.projectService.getMuestra(this.projectId, this.sondeo, this.muestra).subscribe({
            next: (data) => {
              const id = String(data.id)
              id && this.routerStateService.setMuestraProject(id);
              this.projectId && this.routerStateService.setIdProject(this.projectId)
              this.sondeo && this.routerStateService.setSondeo(this.sondeo)
              this.muestra && this.routerStateService.setMuestra(this.muestra)
            },
            error: (error) => {
              console.error('Error :', error);
            }
          });
        }
      });
  }
}

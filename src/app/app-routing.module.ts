import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/atom/layout/layout.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateSolicitanteComponent } from './pages/create-solicitante/create-solicitante.component';
import { ListSolicitantesComponent } from './components/lists/list-solicitantes/list-solicitantes.component';
import { ListProjectsComponent } from './components/lists/list-projects/list-projects.component';
import { EnsayoComponent } from './pages/ensayo/ensayo.component';
import { InformeEnsayoComponent } from './pages/informe-ensayo/informe-ensayo.component';
import { LoginComponent } from './components/atom/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'',
        redirectTo:'lab/crear/proyecto',
        pathMatch:'full'
      },
      {
        path:'lab/login',
        component:LoginComponent
       },
       {
        path:'lab/crear/proyecto',
        component:CreateProjectComponent
      },
       {
        path:'lab/edit/proyecto/:id',
        component:CreateProjectComponent
      },
      {
        path:'lab/crear/solicitante',
        component:CreateSolicitanteComponent
      },
      {
        path:'lab/edit/solicitante/:id',
        component:CreateSolicitanteComponent
      },
      {
        path:'lab/list/solicitantes',
        component:ListSolicitantesComponent
      },
      {
        path:'lab/list/proyectos',
        component:ListProjectsComponent
      },
      {
        path:'lab/ensayo/:id',
        component:EnsayoComponent
      },
      {
        path:'lab/informe/:id',
        component:InformeEnsayoComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

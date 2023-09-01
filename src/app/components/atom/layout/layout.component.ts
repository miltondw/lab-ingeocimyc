import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `<app-navbar/> <router-outlet />`,
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {

}

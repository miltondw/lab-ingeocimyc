import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISolicitante, ISolicitanteData } from '@app/models/Solicitante.model'
import { SolicitanteService } from '@app/services/solicitante.service'

@Component({
  selector: 'app-list-solicitantes',
  templateUrl: './list-solicitantes.component.html',
  styleUrls: ['./list-solicitantes.component.sass']
})
export class ListSolicitantesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'phone', 'business', 'email','edit'];
  itemsList = [['id', 'ID'], ['name', 'Nombre'], ['lastname', 'Apillido'], ['phone', 'Teléfono'], ['business', 'Empresa'], ['email', 'Correo'],['edit','editar']]
  solicitantes: ISolicitanteData[] = [];
  dataSource: MatTableDataSource<ISolicitanteData>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor (private solicitanteService: SolicitanteService) {
    this.dataSource = new MatTableDataSource();
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getData(e.pageIndex, e.pageSize)
  }

  ngAfterViewInit() {
    this.getData()
  }
  getData(pageNumber?: number, elements?: number) {
    this.solicitanteService.get(pageNumber, elements).subscribe({
      next: (data: ISolicitante) => {
        this.solicitantes = data.content;
        this.dataSource = new MatTableDataSource(data.content);
        this.length = data.totalElements;
        this.pageIndex = data.pageable.pageNumber;
        if (this.length > 100) this.pageSizeOptions.push(this.length)
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  deleteSolicitante(id: number) {
    this.solicitanteService.delete(id).subscribe({
      next: () => {
        console.log("solicitante  " + id + " deleted")
        this.getData(this.pageIndex, this.pageSize);
      },
      error: (error) => {
        console.error('Error al eliminar proyecto:', error);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



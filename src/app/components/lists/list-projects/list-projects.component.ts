import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProject, IProjectData } from '@app/models/Project.model'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.sass']
})
export class ListProjectsComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'location', 'reference', 'probes', 'solicitante', 'date', 'inf', 'edit'];
  itemsList = [['title', 'Titulo'], ['location', 'Ubicación'], ['reference', 'Referencia'], ['probes', 'Sondeos'], ['solicitante', 'Solicitante'], ['date', 'Fecha'], ['inf', 'Informe'], ['edit', 'editar']]
  projects: IProjectData[] = [];
  dataSource: MatTableDataSource<IProjectData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sorting: Sort = {
    active: 'date',
    direction: 'desc'
  };

  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getData(e.pageIndex, e.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor (private projectService: ProjectService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.getData()
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.sorting = sort;
      this.getData(this.pageIndex, this.pageSize);
    });
  }

  getData(pageNumber?: number, elements?: number,) {
    const sortField = this.sorting.active;
    const sortDirection = this.sorting.direction;
    this.projectService.get(pageNumber, elements, sortField, sortDirection).subscribe({
      next: (data: IProject) => {
        this.projects = data.content;
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
  deleteProject(id: number) {
    this.projectService.delete(id).subscribe({
      next: () => {
        console.log("project " + id + " deleted")
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
  }

}

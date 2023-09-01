import { Component, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { ProjectService } from '@app/services/project.service';
interface IValores {
  id: string
  sondeo: number
  muestra: number
  porcentajeHumedad: number[]
  numeroDeGolpes: number[]
  limiteLiquido: number
}

@Component({
  selector: 'app-grafica-limites',
  templateUrl: './grafica-limites.component.html',
  styleUrls: ['./grafica-limites.component.sass']
})

export class GraficaLimitesComponent implements AfterViewInit {
  constructor (
    private projectService: ProjectService
  ) { }
  @Input()
  set SetValoresXY({ porcentajeHumedad, numeroDeGolpes, sondeo, muestra, id, limiteLiquido }:IValores) {
    this.porcentajeHumedad = porcentajeHumedad;
    this.numeroDeGolpes = numeroDeGolpes;
    this.limiteLiquido = limiteLiquido
    this.crearGrafica()
  }

  porcentajeHumedad: number[] = [];
  numeroDeGolpes: number[] = [];
  limiteLiquido: number = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.chartCanvas.nativeElement;
    canvas.addEventListener('resize', () => {
      this.chart?.update();
    });
  }

  crearGrafica() {
//      console.log( this.limiteLiquido,this.porcentajeHumedad,this.numeroDeGolpes)
    Chart.register(Annotation);
    this.lineChartData = {
      datasets: [
        {
          data: [
            { x: this.limiteLiquido, y: 25 },
            { x: this.limiteLiquido, y: 10 },
          ],
          type: 'line',
          label: `Tendencia=${this.limiteLiquido}`,
          backgroundColor: 'red',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(0,0,0,0.9)',
          borderDash: [5, 5],
          fill: false,
        },
        {
          data: this.porcentajeHumedad.map((x, i) => ({
            x: x,
            y: this.numeroDeGolpes[i],
          })),
          type: 'line',
          label: 'Golpes',
          backgroundColor: 'red',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(0,0,0,0.9)',
          fill: false,
        },
      ],
    };
    this.lineChartOptions = {
      aspectRatio: 1.5,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 3,
          borderWidth: 1,
          hoverRadius: 4,
          hoverBorderWidth: 2,
        },
        line: {
          borderWidth: 2,
          tension: 0.3,
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              size: 18,
            },
          },
        },
      },
      scales: {
        y: {
          min: 10,
          max: Math.ceil(Math.max(...this.numeroDeGolpes) / 5) * 5,
          ticks: {
            stepSize: 5,
            color: 'rgba(0,0,0,1)',
            font: {
              size: 16,
            },
          },
          grid: {
            color: 'rgba(0,0,0,1)',
            lineWidth: 1,
          },
        },
        x: {
          min: this.porcentajeHumedad[0] - 1,
          max: Math.max(...this.porcentajeHumedad) + 0.2,
          ticks: {
            stepSize: 1,
            color: 'rgba(0,0,0,1)',
            callback: function (value) {
              return Math.ceil(Number(value));
            },
            font: {
              size: 16,
            },
          },
          grid: {
            color: 'rgba(0,0,0,1)',
            lineWidth: 1,
          },
        },
      },
    };
  }

  public lineChartData: ChartConfiguration['data'] = { datasets: [] };

  public lineChartOptions: ChartConfiguration['options'] = {};

  public lineChartType: ChartType = 'scatter';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}


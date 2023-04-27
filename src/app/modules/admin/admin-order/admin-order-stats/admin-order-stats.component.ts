import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-stats',
  templateUrl: './admin-order-stats.component.html',
  styleUrls: ['./admin-order-stats.component.scss']
})
export class AdminOrderStatsComponent implements AfterViewInit {

  @ViewChild("stats") private stats!: ElementRef;

  chart!: Chart;
  numberOfOrders: number = 0;
  totalSales: number = 0;

  private data = {
    labels: [],
    datasets: [
      {
        label: 'Zamówienia',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sprzedaż [PLN]',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;

  constructor(private adminOrderService: AdminOrderService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.setupChart();
    this.getSalesStatistics();
  }

  private setupChart() {
    this.chart = new Chart(this.stats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Wykres sprzedaży'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: '#FF3F7C'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: '#0088FF'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }

  private getSalesStatistics() {
    this.adminOrderService.getSalesStatistics()
      .subscribe(stats => {
        this.data.labels = stats.labels;
        this.data.datasets[0].data = stats.orders;
        this.data.datasets[1].data = stats.sales;
        this.chart.update();
        this.numberOfOrders = stats.orders.reduce((acc: number, value: number) => acc + value);
        this.totalSales = stats.sales.reduce((acc: number, value: number) => acc + value);
      });
  }
}

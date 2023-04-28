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
  totalNumberOfOrders: number = 0;
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
            position: 'top',
            labels: {
              font: {
                size: 16
              }
            }
          },
          title: {
            display: true,
            text: 'Wykres sprzedaży',
            font: {
              size: 28
            }
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
          },
          x: {
            title: {
              display: true,
              text: 'Dzień aktualnego miesiąca',
              font: {
                size: 15
              }
            }
          }
        }
      }
    });
  }

  private getSalesStatistics() {
    this.adminOrderService.getSalesStatistics()
      .subscribe(stats => {
        this.data.labels = stats.labelsSet;
        this.data.datasets[0].data = stats.ordersList;
        this.data.datasets[1].data = stats.salesList;
        this.chart.update();
        this.totalNumberOfOrders = stats.totalNumberOfOrders;
        this.totalSales = stats.totalSales;
      });
  }
}

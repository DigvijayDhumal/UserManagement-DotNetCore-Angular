import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  userId = 1;
  products: any[] = [];
  chart: Chart | undefined;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    // canvas ready here
  }

  loadProducts() {
    this.productService.getProductsByUser(this.userId).subscribe(res => {
      this.products = res as any[];

      // 🔥 Render chart AFTER data + view ready
      setTimeout(() => {
        this.renderChart();
      }, 0);
    });
  }

  renderChart() {

    if (!this.chartCanvas) {
      console.error('Canvas not found');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.products.map(p =>
      new Date(p.createdDate).toLocaleDateString()
    );

    const data = this.products.map(p => p.quantity);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Products Added',
            data,
            backgroundColor: '#667eea'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: {
            title: { display: true, text: 'Date' }
          },
          y: {
            title: { display: true, text: 'Quantity' }
          }
        }
      }
    });
  }
}

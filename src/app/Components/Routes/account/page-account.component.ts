import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';
import { TaskService } from '../../../Services/TaskService/task.service';
import { Chart } from 'chart.js/auto'; // Importa o Chart.js

@Component({
  selector: 'app-page-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-account.component.html'
})
export class PageAccountComponent implements OnInit {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router
  ) { }

  userData = {
    name: '',
    email: '',
    id: '',
    tasks: []
  };

  tasks: any[] = [];
  chart: any;

  ngOnInit() {
    this.userService.getUserData().subscribe((data: any) => {
      if (data) {
        const userData = Array.isArray(data) ? data[0] : data;

        this.userData.name = userData.name || '';
        this.userData.email = userData.email || '';
        this.userData.id = userData.id || '';
        this.userData.tasks = userData.tasks || [];
      }
    });

    this.taskService.getCompletTask().subscribe((data: any) => {
      this.tasks = data || [];
      console.log('Tasks:', this.tasks);
      setTimeout(() => {
        this.generateConsistencyChart();
      }, 100);
    });
  }

  generateConsistencyChart() {
    // Verifica se o elemento canvas está disponível
    const ctx = document.getElementById('consistencyChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas não encontrado!');
      return;
    }

    // Filtra apenas tarefas periódicas
    const periodicTasks = this.tasks.filter(task => task.periodical);

    // Cria os dados para o gráfico
    const labels = periodicTasks.map(task => task.title);
    const data = periodicTasks.map(task =>
      task.interval > 0 ? task.taskCompletion.length / task.interval : 0
    );

    console.log('Labels:', labels);
    console.log('Data:', data);

    // Remove gráfico anterior se existir
    if (this.chart) {
      this.chart.destroy();
    }

    // Criar o gráfico
    this.chart = new Chart(ctx, { // <- Usa o ctx aqui
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Consistência (Feito/Intervalo)',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

}

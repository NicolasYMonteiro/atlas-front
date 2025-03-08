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
  charts: any;

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
        this.generateConsistencyCharts();
      }, 500);
    });
  }
 
  generateConsistencyCharts() {
    const periodicTasks = this.tasks.filter(task => task.periodical);
  
    // Destroi gráficos anteriores (se existirem)
    if (this.charts) {
      this.charts.forEach((chart: { destroy: () => any; }) => chart.destroy());
    }
    this.charts = []; // Resetando array de gráficos
  
    const today = new Date();
    
    periodicTasks.forEach((task, index) => {
      const canvasId = `consistencyChart-${index}`;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) {
        console.error(`Canvas ${canvasId} não encontrado!`);
        return;
      }
  
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error(`Contexto 2D do Canvas ${canvasId} não encontrado!`);
        return;
      }
  
      const labels: string[] = [];
      const doneData: number[] = [];
  
      const startDate = new Date(task.dateCreator);
      const interval = task.interval || 1;
      const completedDates = new Set(
        task.taskCompletion.map((comp: any) => new Date(comp.completion).toISOString().split('T')[0])
      );
  
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  
      for (let d = new Date(startDate.getTime()); d <= today; d.setDate(d.getDate() + interval)) {
        const formattedDate = d.toISOString().split('T')[0];
  
        if (d >= fifteenDaysAgo) {
          labels.push(formattedDate);
          doneData.push(completedDates.has(formattedDate) ? 1 : 0);
        }
      }
  
      // Criando gráfico individual para a tarefa
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: `${task.title}`,
              data: doneData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 3,
              fill: false,
              tension: 0.1,
              borderCapStyle: 'round'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Datas' } },
            y: {
              title: { display: true, text: 'Feito (1) / Não Feito (0)' },
              ticks: {
                stepSize: 1,
                callback: (value) => (value === 1 ? 'Feito' : 'Não Feito')
              },
              min: 0,
              max: 1
            }
          }
        }
      });
  
      this.charts.push(chart); // Armazena gráfico para futura destruição
    });
  }
  
}

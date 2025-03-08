import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { format } from 'date-fns';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTaskService } from '../../../Services/SubTaskService/sub-task.service'
import { TaskClassico } from '../../../Models/task.model';
import { ToggleClass } from './toggleClass';

import { SubTaskCreateListComponent } from '../sub-task-create-list/sub-task-create-list.component'
import { SubTask } from '../../../Models/subtTask.model';

@Component({
  selector: 'add-task-page',
  imports: [CommonModule, NgxMaterialTimepickerModule, FormsModule, NgOptimizedImage, SubTaskCreateListComponent],
  templateUrl: './add-task-page.component.html'
})
export class AddTaskPageComponent {

  toggle: ToggleClass;

  constructor(private taskService: TaskService, private subtTaskService: SubTaskService) {
    this.toggle = new ToggleClass(this.data);
  }

  @Output() closeAddTaskEvent = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<any[]>();

  subTasks: { title: string, verif: boolean }[] = [];

  ngOnInit() {
    this.subTasks = []; // Garante que o array não é recriado indevidamente
  }
  maxSubTasks: number = 10; // Limite de subtarefas

  addSubTask() {
    if (this.subTasks.length < this.maxSubTasks) {
      this.subTasks = [...this.subTasks, { title: '', verif: false }];
      console.log("addSubTask: ", this.subTasks)
    } else {
      alert('Limite de subtarefas atingido.');
    }
  }

  removeSubTask(index: number) {
    this.subTasks.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }


  @ViewChild(SubTaskCreateListComponent) subTaskComponent!: SubTaskCreateListComponent;

  closeAddTask() {
    this.closeAddTaskEvent.emit();
  }


  data: TaskClassico = new TaskClassico(
    0, // id
    '', // title
    '', // description
    false, // emergency
    false, // periodical
    new Date().toISOString(), // date
    0, // interval
    '', // hour
    false, // multiple
    format(new Date(), 'yyyy-MM-dd') // dateCreator
  );

  saveTask() {
    console.log("Enviando dados:", this.data);
    if (this.isFormValid()) {
      this.data.interval = Number(this.data.interval);
      this.data.date = new Date(this.data.date).toISOString();
      this.data.dateCreator = new Date().toISOString();

      console.log("subTask: ", this.subTasks);;

      const payload = {
        title: this.data.title,
        description: this.data.description,
        emergency: this.data.emergency || false,
        periodical: this.data.periodical || false,
        date: new Date(this.data.date).toISOString(),
        interval: Number(this.data.interval), // Garante que é string, se a API esperar isso
        hour: this.data.hour,
        multiple: this.subTasks.length > 0, // Define se tem múltiplas tarefas
        dateCreator: new Date().toISOString(),
        multipleTask: this.subTasks // Sempre enviar como array
      };

      console.log("Enviando payload:", payload);

      this.taskService.postTask(payload).subscribe({
        next: (res) => {
          this.closeAddTask();
          window.location.reload();
        },
        error: (err) => {
          console.error('Erro ao adicionar a tarefa:', err);
        }
      });
    }
  }

  isFormValid() {
    return this.data.title && this.data.description && this.data.hour;
  }

  // Métodos que abrem e fecham as opções do Form
  toggleEmergency() {
    this.toggle.toggleEmergency();
  }

  toggleDivGapVisibility() {
    this.toggle.toggleDivGapVisibility();
  }

  toggleSectionDailyDayVisibility() {
    this.toggle.toggleSectionDailyDayVisibility();
  }

  toggleSectionWeekDayVisibility() {
    this.toggle.toggleSectionWeekDayVisibility();
  }

  toggleSectionPersonDayVisibility() {
    this.toggle.toggleSectionPersonDayVisibility();
  }

  toggleSectionSubVisibility() {
    this.toggle.toggleSectionSubVisibility();
  }
}
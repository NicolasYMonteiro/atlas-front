import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { format, parse, addDays } from 'date-fns';
import { TaskClassico } from '../../Routes/all-list-page/all-list-page.component';
import { TaskService } from '../../../Services/TaskService/task.service';
import {SubTaskService} from '../../../Services/SubTaskService/sub-task.service'

import {SubTaskCreateListComponent} from '../sub-task-create-list/sub-task-create-list.component';


@Component({
  selector: 'edit-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule, SubTaskCreateListComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrl: './edit-task-page.component.scss'
})
export class EditTaskPageComponent {

  @Input() data!: TaskClassico; // Quando clico em uma Task do All-list-page carrega as info
  @Output() closeEditTaskEvent = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<any[]>();

  dataformat: { title?: string; description?: string; date?: string; interval?: number; hour?: string } = {};

  constructor(private taskService: TaskService, private subtTaskService: SubTaskService) { }

  isSectionIntervaloVisible = false;
  isSectionDateVisible = false;

  subTasks: string[] = []; // Recebe as subtarefas

  // Data convertida
  formattedDate!: string;

  ngOnInit(): void {
    if (this.data) {
      this.dataformat = {
        title: this.data.title,
        description: this.data.description,
        date: this.data.date,
        interval: this.data.interval,
        hour: this.data.hour
      };
      // Converte a string "14-08-2024" em um objeto Date usando date-fns
      const parsedDate = parse(this.data.date, 'dd-MM-yyyy', new Date());

      // Formata a data para o formato que o input date aceita: yyyy-MM-dd
      this.formattedDate = format(parsedDate, 'yyyy-MM-dd');

      this.getSubTask();

    }
  }

  getSubTask() {
    this.subtTaskService.getByTask(this.data.id).subscribe({
      next: (subTasks: any[][]) => {
        if (Array.isArray(subTasks)) {
          console.log("subtask: ", subTasks);
  
          // Achata e filtra subtarefas válidas
          const flattenedSubTasks = subTasks.flat();
          const validSubTasks = flattenedSubTasks.filter(subTask =>
            subTask && typeof subTask === 'object' && 'title' in subTask
          );
  
          // Extrai apenas os títulos
          this.subTasks = validSubTasks.map(subTask => subTask.title);
  
          console.log("Títulos de Subtarefas: ", this.subTasks); // Exibe os títulos extraídos
        } else {
          console.error("Formato inesperado dos dados retornados: ", subTasks);
        }
      },
      error: (err) => console.error("Erro ao obter subtarefas:", err)
    });
  }
  


  closeEditTask() {
    this.closeEditTaskEvent.emit();
  }

  saveTask() {
    const parsedDate = format(parse(this.formattedDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');

    this.dataformat = {
      title: this.data.title,
      description: this.data.description,
      date: parsedDate,
      interval: this.data.interval,
      hour: this.data.hour
    };

    if (this.isFormValid()) { //verifica validade do Form
      if (this.data.periodical === true) { // Ser for periódico, calcula o dia com base do intervalo
        this.dataformat.date = format(new Date(), 'yyyy-MM-dd');
      }

      this.taskService.patchTask(this.data.id, this.dataformat).subscribe({
        next: () => { this.handleSavedTask(this.subTasks) },
        error: (err) => { console.error('Erro ao atualizar a tarefa:', err) }
      }); // Envia os dados pra API
    }
  }

  handleSavedTask(subTasks: string[]) {
    if(subTasks.length > 0){
      this.subtTaskService.postSubTask(this.data.id, subTasks).subscribe({
        next: () => { 
          window.location.reload();
         },
        error: (err) => {console.error('Erro ao adicionar a sub tarefa:', err);}
      });
    }

  }

  isFormValid() {
    return this.data.title && this.data.description && this.data.hour;
  }
}

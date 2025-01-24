import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { format, parse } from 'date-fns';
import { TaskClassico } from '../../Routes/all-list-page/all-list-page.component';
import { SubTask } from '../../../Models/subtTask.model';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTaskService } from '../../../Services/SubTaskService/sub-task.service';

@Component({
  selector: 'display-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule],
  templateUrl: './display-task-page.component.html',
  styleUrls: ['./display-task-page.component.scss']
})
export class DisplayTaskPageComponent implements OnInit {

  @Input() data!: TaskClassico; // Quando clico em uma Task do All-list-page carrega as info
  @Output() closeDisplayTaskEvent = new EventEmitter<void>();
  @Output() editTaskEvent = new EventEmitter<any[]>();

  constructor(private taskService: TaskService, private subTaskService: SubTaskService){}

  isSectionIntervaloVisible = false;
  isSectionDateVisible = false;

  intervalShow = '';
  formattedDate!: string;

  vetorSubTask: SubTask[] = [];

  ngOnInit(): void {
    if (this.data.interval === 1) {
      this.intervalShow = `${this.data.interval} dia`
    } else {
      this.intervalShow = `${this.data.interval} dias`
    }

    // Converte a string "14-08-2024" em um objeto Date usando date-fns
    const parsedDate = parse(this.data.date, 'dd-MM-yyyy', new Date());

    // Formata a data para o formato que o input date aceita: yyyy-MM-dd
    this.formattedDate = format(parsedDate, 'yyyy-MM-dd');

    this.getSubTask();

  }

  getSubTask() {
    this.subTaskService.getByTask(this.data.id).subscribe({
      next: (subTasks: any[]) => {
        if (Array.isArray(subTasks)) {
          console.log("subtask: ", subTasks);

          const flattenedSubTasks = subTasks.flat();
          this.vetorSubTask = flattenedSubTasks
          .filter(subTask => subTask && subTask.title)  // Filtra objetos com 'title' definido
          .map(subTask => subTask);
          
          console.log("Vetor de Subtarefas: ", this.vetorSubTask); // Agora deve mostrar os títulos corretamente
        } else {
          console.error("Formato inesperado dos dados retornados: ", subTasks);
        }
      },
      error: (err) => console.error("Erro ao obter subtarefas:", err)
    });
  }
  


  closeDisplayTask() {
    this.closeDisplayTaskEvent.emit();
  }

  EditTask() {
    this.editTaskEvent.emit();
  }

  DeleteTask(){
    this.taskService.delTask(this.data.id).subscribe({
      next: () => {window.location.reload()},
      error: (err) => {console.error("Erro ao deletar tarefa: ", err)}

    })
  }

}
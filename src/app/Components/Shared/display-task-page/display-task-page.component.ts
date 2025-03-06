import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { format, parse } from 'date-fns';
import { TaskClassico } from '../../Routes/task-list/all-list-page.component';
import { SubTask } from '../../../Models/subtTask.model';
import { TaskService } from '../../../Services/TaskService/task.service';

@Component({
  selector: 'display-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule],
  templateUrl: './display-task-page.component.html',
})
export class DisplayTaskPageComponent implements OnInit {

  @Input() data!: TaskClassico; // Quando clico em uma Task do All-list-page carrega as info
  @Output() closeDisplayTaskEvent = new EventEmitter<void>();
  @Output() editTaskEvent = new EventEmitter<any[]>();

  constructor(private taskService: TaskService){}

  isSectionIntervaloVisible = false;
  isSectionDateVisible = false;

  intervalShow = '';
  formattedDate!: string;

  vetorSubTask: SubTask[] = []; // Armazena as subtarefas

  ngOnInit(): void {
    console.log("Display Tarefa: ", this.data);

    if (this.data.multipleTask) {
      this.vetorSubTask = this.data.multipleTask;
      console.log("Subtarefas carregadas:", this.vetorSubTask);
    } else {
      console.warn("Nenhuma subtask encontrada no objeto de tarefa.");
    }

    if (this.data.interval === 1) {
      this.intervalShow = `${this.data.interval} dia`
    } else {
      this.intervalShow = `${this.data.interval} dias`
    }

    // Converte a string "14-08-2024" em um objeto Date usando date-fns
    const parsedDate = parse(this.data.date, 'yyyy-MM-dd', new Date());

    // Formata a data para o formato que o input date aceita: yyyy-MM-dd
    this.formattedDate = format(parsedDate, 'yyyy-MM-dd');
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
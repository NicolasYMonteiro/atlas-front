import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage  } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { format } from 'date-fns';
import { FormateSectionsService } from '../../../Services/TaskFormateSections/formate-sections.service';
import { TaskService } from '../../../Services/TaskService/task.service';
import {SubTaskService} from '../../../Services/SubTaskService/sub-task.service'
import { TaskClassico } from '../../../Models/task.model';
import { ToggleClass } from './toggleClass';

import {SubTaskCreateListComponent} from '../sub-task-create-list/sub-task-create-list.component'

@Component({
  selector: 'add-task-page',
  standalone: true,
  imports: [CommonModule, NgxMaterialTimepickerModule, FormsModule, NgOptimizedImage, SubTaskCreateListComponent],
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss']
})
export class AddTaskPageComponent {

  toggle: ToggleClass;
  subTasks: string[] = []; // Recebe as subtarefas

  constructor(private taskService: TaskService, private subtTaskService: SubTaskService) {
    this.toggle = new ToggleClass(this.data);
  }

  @Output() closeAddTaskEvent = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<any[]>();


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
    format(new Date(), 'yyyy-MM-dd'), // date
    0, // interval
    '', // hour
    false, // multiple
    format(new Date(), 'yyyy-MM-dd') // dateCreator
  );

  saveTask() {
    if (this.isFormValid()) { // verifica validade do Form
      this.taskService.postTask(this.data).subscribe({
        next: (res) => { 
          this.data.id = res.id
          console.log("id: ", this.data.id)
          this.handleSavedTask(this.subTasks);

          this.closeAddTask();
          window.location.reload();

         },
        error: (err) => {console.error('Erro ao adicionar a tarefa:', err);}
      });
    }
  }

  handleSavedTask(subTasks: string[]) {
    if(subTasks.length > 0){
      this.subtTaskService.postSubTask(this.data.id, subTasks).subscribe({
        next: () => { 
          console.log("tudo certo, paizão")
         },
        error: (err) => {console.error('Erro ao adicionar a sub tarefa:', err);}
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
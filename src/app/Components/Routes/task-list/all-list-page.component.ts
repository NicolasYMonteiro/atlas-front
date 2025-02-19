//all-list-page.component

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from '../../Secondary/top-bar/top-bar.component';
import { TaskComponent } from '../../Shared/task/task.component';
import { AddButtomComponent } from '../../Shared/add-buttom/add-buttom.component';
import { AddTaskPageComponent } from '../../Shared/add-task-page/add-task-page.component';
import { DisplayTaskPageComponent } from '../../Shared/display-task-page/display-task-page.component';
import { CheckTaskComponent } from '../../Shared/check-task/check-task.component';
import { FormateSectionsService } from '../../../Services/TaskFormateSections/formate-sections.service';
import { TaskService } from '../../../Services/TaskService/task.service';
import { TaskClassico } from '../../../Models/task.model';
import { EditTaskPageComponent } from '../../Shared/edit-task-page/edit-task-page.component';
import { UserService } from '../../../Services/userService/user.service';
import { format, parseISO } from 'date-fns';


export interface Section {
  title: string;
  tasks: TaskClassico[];

}

@Component({
  selector: 'all-list-page',
  standalone: true,
  imports: [CommonModule, TopBarComponent, TaskComponent, AddButtomComponent, AddTaskPageComponent, DisplayTaskPageComponent, CheckTaskComponent, EditTaskPageComponent],
  templateUrl: './all-list-page.component.html'
})

export class AllListPageComponent implements OnInit {

  constructor(
    private formateSectionsService: FormateSectionsService,
    private taskService: TaskService
  ) { }

  userData = {
    tasks: [] as TaskClassico[]
  };

  calculateSections() { // importação do services para formatação das sections
    this.sections = this.formateSectionsService.calculateSections(this.tasks);
  }

  sections: Section[] = []; // Vetor das sections geradas

  tasks: TaskClassico[] = [];

  ngOnInit(): void {
    console.log("tasks: ", this.userData)

    this.taskService.getTaskData().subscribe((data: any) => {
      if (data) {
        console.log("DATA task: ", data)
        const tasksArray = Array.isArray(data) ? data : [data];
        this.tasks = tasksArray.map(task => new TaskClassico(
          task.id,
          task.title,
          task.description,
          task.emergency,
          task.periodical,
          task.date ? format(parseISO(task.date), 'yyyy-MM-dd') : '',
          task.interval,
          task.hour,
          task.multiple,
          task.dateCreator ? format(parseISO(task.dateCreator), 'dd-MM-yyyy') : '',
          task.multipleTask || []  // Passando multipleTask corretamente

        ));
      }
      this.calculateSections(); // calculateSections após atualizar tasks

    });
  }

  // Visibilidade das sections dos componentes  
  isAddTaskVisible: boolean = false;
  isDisplayTaskVisible: boolean = false;
  isCheckTaskVisible: boolean = false;
  isEditTaskVisible: boolean = false;



  infoTask!: TaskClassico; // Informaçãos do vetor de task

  openDisplayTask(task: TaskClassico) { // Envia os dados pro mostruário
    this.infoTask = task;
    this.toggleDisplayTask();
  }

  openCheckTask(task: TaskClassico) { // Envia os dados pro check
    this.infoTask = task;
    this.toggleCheckTask();
  }

  openEditTask(task: TaskClassico) { // Envia os dados pro check
    this.infoTask = task;
    this.toggleEditTask();
  }

  toggleAddTask() { // Altera visibilidade da section criação
    this.isAddTaskVisible = !this.isAddTaskVisible;

    // Garantir que apenas uma seção esteja visível
    if (this.isDisplayTaskVisible === true || this.isCheckTaskVisible === true || this.isEditTaskVisible === true) {
      this.isDisplayTaskVisible = false;
      this.isCheckTaskVisible = false;
      this.isEditTaskVisible = false;
    }
  }

  toggleDisplayTask() { // Altera visibilidade da section display
    this.isDisplayTaskVisible = !this.isDisplayTaskVisible;

    // Garantir que apenas uma seção esteja visível
    if (this.isAddTaskVisible === true || this.isCheckTaskVisible === true || this.isEditTaskVisible === true) {
      this.isAddTaskVisible = false;
      this.isCheckTaskVisible = false;
      this.isEditTaskVisible = false;
    }
  }

  toggleCheckTask() { // Altera visibilidade da section check
    this.isCheckTaskVisible = !this.isCheckTaskVisible;

    // Garantir que apenas uma seção esteja visível
    if (this.isAddTaskVisible === true || this.isDisplayTaskVisible === true || this.isEditTaskVisible === true) {
      this.isAddTaskVisible = false;
      this.isDisplayTaskVisible = false;
      this.isEditTaskVisible = false;
    }
  }

  toggleEditTask() { // Altera visibilidade da section Edit
    this.isEditTaskVisible = !this.isEditTaskVisible;

    // Garantir que apenas uma seção esteja visível
    if (this.isAddTaskVisible === true || this.isCheckTaskVisible === true || this.isDisplayTaskVisible === true) {
      this.isAddTaskVisible = false;
      this.isCheckTaskVisible = false;
      this.isDisplayTaskVisible = false;
    }
  }

  onTaskSaved(newTasks: any[]) { // Função que salva novas tasks no vetor
    this.tasks = [...this.tasks, ...newTasks];
    this.calculateSections();
  }

}

export { TaskClassico };

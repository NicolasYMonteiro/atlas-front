import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskClassico} from '../../../Models/task.model';


@Component({
    selector: 'task',
    imports: [CommonModule],
    templateUrl: './task.component.html'
})
export class TaskComponent {
  @Input() data!: TaskClassico;


  @Output() taskClicked = new EventEmitter<TaskClassico>();
  @Output() verifClicked = new EventEmitter<TaskClassico>();

  openDisplayTask() {
    this.taskClicked.emit(this.data);
  }

  openCheckTask(){
    this.verifClicked.emit(this.data);
  }

}
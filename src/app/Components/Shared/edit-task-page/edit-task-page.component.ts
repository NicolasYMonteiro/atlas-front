import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { format, parse, addDays } from 'date-fns';
import { TaskClassico } from '../../Routes/task-list/all-list-page.component';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTaskService } from '../../../Services/SubTaskService/sub-task.service';
import { SubTaskCreateListComponent } from '../sub-task-create-list/sub-task-create-list.component';
import { SubTask } from '../../../Models/subtTask.model';

@Component({
  selector: 'edit-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule, SubTaskCreateListComponent],
  templateUrl: './edit-task-page.component.html',
})
export class EditTaskPageComponent implements OnInit {
  @Input() data!: TaskClassico; // Quando clico em uma Task do All-list-page carrega as info
  @Output() closeEditTaskEvent = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<any[]>();
  @Output() savedTask = new EventEmitter<SubTask[]>(); // Corrige a emissão de subtarefas

  dataformat: { title?: string; description?: string; date?: string; interval?: number; hour?: string } = {};
  subTasks: SubTask[] = [];

  constructor(private taskService: TaskService, private subTaskService: SubTaskService) { }

  isSectionIntervaloVisible = false;
  isSectionDateVisible = false;

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
      
      this.subTasks = this.data.multipleTask || [];
      console.log("subtask: ", this.subTasks)
      
      // Converte a string "14-08-2024" em um objeto Date usando date-fns
      const parsedDate = parse(this.data.date, 'yyyy-MM-dd', new Date());
      // Formata a data para o formato que o input date aceita: yyyy-MM-dd
      this.formattedDate = format(parsedDate, 'yyyy-MM-dd');
    }
  }

  maxSubTasks: number = 10; // Limite de subtarefas

  addSubTask() {
    if (this.subTasks.length < this.maxSubTasks) {
      this.subTasks.push({ title: '' } as SubTask); // Adiciona uma nova subtarefa vazia
    } else {
      alert('Limite de subtarefas atingido.');
    }
  }

  removeSubTask(index: number) {
    this.subTasks.splice(index, 1);
  }

  emitSubtask() {
    this.savedTask.emit(this.subTasks); // Emite o vetor de subtarefas completo
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  closeEditTask() {
    this.closeEditTaskEvent.emit();
  }

  handleSavedTask() {
    if (this.subTasks.length > 0) {
      const updatedSubTasks = this.subTasks.map(subTask => subTask.title);
      this.subTaskService.postSubTask(this.data.id, updatedSubTasks).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error('Erro ao adicionar/atualizar a sub tarefa:', err);
        }
      });
    }
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

    if (this.isFormValid()) {
      if (this.data.periodical === true) {
        this.dataformat.date = format(new Date(), 'yyyy-MM-dd');
      }

      this.taskService.patchTask(this.data.id, this.dataformat).subscribe({
        next: () => { this.handleSavedTask(); },
        error: (err) => { console.error('Erro ao atualizar a tarefa:', err); }
      });
    }
  }

  isFormValid() {
    return this.data.title && this.data.description && this.data.hour;
  }
}

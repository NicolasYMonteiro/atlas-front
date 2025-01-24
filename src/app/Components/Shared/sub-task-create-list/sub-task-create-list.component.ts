import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-task-create-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sub-task-create-list.component.html',
  styleUrl: './sub-task-create-list.component.scss'
})

export class SubTaskCreateListComponent {

  @Output() SavedTask = new EventEmitter<string[]>();
  @Input() subTasks: string[] = []; // Armazena os títulos das subtarefas
  maxSubTasks: number = 10; // Limite de subtarefas

  addSubTask() {
    if (this.subTasks.length < this.maxSubTasks) {
      this.subTasks.push(''); // Adiciona um novo título de subtarefa vazio
    } else {
      alert('Limite de subtarefas atingido.');
    }
  }

  removeSubTask(index: number) {
    this.subTasks.splice(index, 1);
  }

  emitSubtask() {
    this.SavedTask.emit(this.subTasks); // Emite o vetor de subtarefas completo
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  
}


import { CommonModule, NgOptimizedImage, } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TaskClassico } from '../../../Models/task.model';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTask } from '../../../Models/subtTask.model';
import { SubTaskService } from '../../../Services/SubTaskService/sub-task.service';

@Component({
  selector: 'check-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule],
  templateUrl: './check-task.component.html',
  styleUrl: './check-task.component.scss'
})
export class CheckTaskComponent {
  @Input() data!: TaskClassico;

  @Output() closeCheckTaskEvent = new EventEmitter<void>(); // Evento que fecha a section
  @Output() saveTaskEvent = new EventEmitter<any[]>(); // Evento que envia os dados alterados (AINDA NÂO ENVIA NADA)

  constructor(private taskService: TaskService, private subTaskService: SubTaskService) { }

  verifInternalTasks: boolean[] = [];
  isVerificadoRecord: boolean = false;
  isVerificadoText: boolean = false;
  isVerificadoAudio: boolean = false;
  isVerificadoVideo: boolean = false;

  vetorSubTask: SubTask[] = [];

  dateObj!: { date: string };

  ngOnInit(): void {
    this.getSubTask()
  }

  finalizarTask() {
    if (this.data.periodical === true) {
      this.data.changePeriodo(this.data.date, this.data.interval);
      this.dateObj = { date: this.data.date }; // Preenche o objeto com a data

      this.taskService.patchTask(this.data.id, this.dateObj).subscribe({
        next: () => { window.location.reload() },
        error: (err) => console.error('Erro ao atualizar a tarefa:', err)
      });
    } else {
      this.taskService.delTask(this.data.id).subscribe({
        next: () => { window.location.reload() },
        error: (err) => { console.error('Erro ao deletar a tarefa:', err); }
      });
    }
  }

  getSubTask() {
    this.subTaskService.getByTask(this.data.id).subscribe({
      next: (subTasks: SubTask[]) => {
        if (Array.isArray(subTasks)) {

          this.vetorSubTask = subTasks.flat()
            .filter(subTask => subTask && subTask.title)  // Filtra objetos com 'title' definido
            .map(subTask =>
              new SubTask(subTask.id, subTask.title, subTask.verif)
            );

        } else {
          console.error("Formato inesperado dos dados retornados: ", subTasks);
        }
      },
      error: (err) => console.error("Erro ao obter subtarefas:", err)
    });
  }

  verifSubTask(tarefa: SubTask) {
    tarefa.verif = !tarefa.verif;  // Alterna o valor

  }

  salvarProgresso() {
    const updates = this.vetorSubTask.map(subTask => ({
      id: subTask.id,
      field: 'verif',
      value: subTask.verif
    }))
    console.log("updates: ", updates)

    this.subTaskService.patchTask(updates, this.data.id).subscribe({
      next: (response) => {
        if (response) {
          console.log("Subtask updated successfully: ", response);
        } else {
          console.error("Failed to update subtask: Token not available.");
        }
      },
      error: (error) => {
        console.error("Error updating subtask: ", error);
      }
    });
    this.closeCheckTask();
  }

  closeCheckTask() {
    this.closeCheckTaskEvent.emit();
  }

  checkInternalTask(index: number) {
    this.verifInternalTasks[index] = !this.verifInternalTasks[index];
  }

  toggleDivRecordVisibility() {
    this.isVerificadoRecord = !this.isVerificadoRecord;
  }

  toggleDivTextVisibility() {
    this.isVerificadoText = !this.isVerificadoText;
  }

  toggleDivAudioVisibility() {
    this.isVerificadoAudio = !this.isVerificadoAudio;
  }

  toggleDivVideoVisibility() {
    this.isVerificadoVideo = !this.isVerificadoVideo;
  }

  onAudioSelected(event: any) {
    const file = event.target.files[0];
    console.log("Audio file selected: ", file);
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    console.log("Video file selected: ", file);
  }


}

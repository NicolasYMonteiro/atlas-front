import { CommonModule, NgOptimizedImage, } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TaskClassico } from '../../../Models/task.model';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTask } from '../../../Models/subtTask.model';
import { SubTaskService } from '../../../Services/SubTaskService/sub-task.service';
import { format, parse } from 'date-fns';

@Component({
  selector: 'check-task',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, NgxMaterialTimepickerModule, FormsModule],
  templateUrl: './check-task.component.html',
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
  
  intervalShow = '';
  formattedDate!: string;

  vetorSubTask: SubTask[] = []; 

  dateObj!: { date: string };

  ngOnInit(): void {
    console.log("CHECK Tarefa: ", this.data);

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

  verifSubTask(tarefa: SubTask) {
    tarefa.verif = !tarefa.verif;  // Alterna o valor

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

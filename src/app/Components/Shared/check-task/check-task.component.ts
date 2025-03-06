import { CommonModule, NgOptimizedImage, } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TaskClassico } from '../../../Models/task.model';
import { TaskService } from '../../../Services/TaskService/task.service';
import { SubTask } from '../../../Models/subtTask.model';
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

  constructor(private taskService: TaskService) { }
  dataformat: { title?: string; description?: string; date?: string; interval?: number; hour?: string } = {};

  verifInternalTasks: boolean[] = [];
  isVerificadoRecord: boolean = false;
  isVerificadoText: boolean = false;
  isVerificadoAudio: boolean = false;
  isVerificadoVideo: boolean = false;

  intervalShow = '';
  vetorSubTask: SubTask[] = [];

  dateObj!: { date: string };

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

      this.vetorSubTask = this.data.multipleTask || [];
      console.log("subtask: ", this.vetorSubTask)

      // Converte a string "14-08-2024" em um objeto Date usando date-fns
      const parsedDate = parse(this.data.date, 'yyyy-MM-dd', new Date());
      // Formata a data para o formato que o input date aceita: yyyy-MM-dd
      this.formattedDate = format(parsedDate, 'yyyy-MM-dd');
    }
  }

  finalizarTask() {
    console.log("finalizar")
    this.taskService.completTask(this.data.id).subscribe({
      next: () => {
        console.log("Tarefa concluida com sucesso!");
        this.closeCheckTask();
        window.location.reload();
      },
      error: (err) => {
        console.error("Erro ao concluir a tarefa:", err);
      }
    });

    this.closeCheckTask();
  }

  salvarProgresso() {
    // Garante que a lista de subtarefas esteja sempre presente
    const formattedSubTasks = this.vetorSubTask.map(subTask => {
      return subTask.id ? { id: subTask.id, title: subTask.title, verif: subTask.verif } : { title: subTask.title, verif: false };
    });

    const payload = {
      title: this.data.title,
      description: this.data.description,
      emergency: this.data.emergency || false,
      periodical: this.data.periodical || false,
      date: this.data.date,
      interval: Number(this.data.interval), // Garante que é string, se a API esperar isso
      hour: this.data.hour,
      multiple: this.vetorSubTask.length > 0, // Define se tem múltiplas tarefas
      dateCreator: new Date().toISOString(),
      multipleTask: formattedSubTasks // Sempre enviar como array
    };

    console.log("Payload enviado:", payload);
    this.taskService.patchTask(this.data.id, payload).subscribe({
      next: () => {
        console.log("Tarefa atualizada com sucesso!");
        this.closeCheckTask();
      },
      error: (err) => {
        console.error("Erro ao atualizar a tarefa:", err);
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

import { Injectable } from '@angular/core';
import { Section } from '../../Components/Routes/task-list/all-list-page.component';
import { format, parse, isSameDay, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task } from '../../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class FormateSectionsService {

  calculateSections(tasks: Task[]): Section[] {

    const sections: Section[] = [];
    const emergencialTasks = tasks.filter(task => task.emergency);

    const today = new Date();
    const todayTasks = tasks.filter(task => !task.emergency && this.isSameDate(this.parseDate(task.date), today));

    const tomorrow = addDays(today, 1);
    const tomorrowTasks = tasks.filter(task => !task.emergency && this.isSameDate(this.parseDate(task.date), tomorrow));

    if (emergencialTasks.length > 0) {
      sections.push({
        title: '* Emergencial',
        tasks: emergencialTasks
      });
    }

    if (todayTasks.length > 0) {
      sections.push({
        title: '* Hoje',
        tasks: todayTasks
      });
    }

    if (tomorrowTasks.length > 0) {
      sections.push({
        title: '* Amanhã',
        tasks: tomorrowTasks
      });
    }

    for (const task of tasks) {
      const taskDate = this.parseDate(task.date);
      if (!this.isSameDate(taskDate, today) && !this.isSameDate(taskDate, tomorrow) && !task.emergency) {
        const title = `* ${format(taskDate, 'dd/MM/yyyy', { locale: ptBR })}`;
        this.pushTaskToSection(sections, title, task);
      }
    }

    return sections;
  }

  private pushTaskToSection(sections: Section[], title: string, task: Task) {
    let section = sections.find(sec => sec.title === title);
    if (!section) {
      section = { title, tasks: [] };
      sections.push(section);
    }
    section.tasks.push(task);
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return isSameDay(date1, date2);
  }

  private parseDate(dateString: string): Date {
    try {
      return parseISO(dateString);
    } catch (error) {
      console.error(`Invalid date: ${dateString}`);
      return new Date(0); // Retorna uma data inválida
    }
  }
}
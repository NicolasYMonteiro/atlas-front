// model

import { addDays, format, parse, parseISO } from "date-fns";


export interface Task {
  id: number;
  title: string;
  description: string;
  emergency: boolean;
  periodical: boolean;
  date: string;
  interval: number;
  hour: string;
  multiple: boolean;
  dateCreator: string;

  changePeriodo(date: string, interval: number): void;
}

export class TaskClassico implements Task {
  id: number;
  title: string;
  description: string;
  emergency: boolean;
  periodical: boolean;
  date: string;
  interval: number;
  hour: string;
  multiple: boolean;
  dateCreator: string;

  constructor(id: number, title: string, description: string, emergency: boolean, periodical: boolean, date: string,
    interval: number, hour: string, multiple: boolean, dateCreator: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.emergency = !!emergency;
    this.periodical = !!periodical;
    this.date = date;
    this.interval = interval;
    this.hour = hour;
    this.multiple = !!multiple;
    this.dateCreator = dateCreator;
  }

  changePeriodo(date: string, interval: number): void {
    this.date = format(new Date(), 'yyyy-MM-dd');
    
    const parsedDate = parseISO(this.date);

    const newDate = addDays(parsedDate, Number(this.interval));
    console.log('Data após addDays:', newDate);
    
    this.date = format(newDate, 'yyyy-MM-dd');
    console.log("Nova data após mudança: ", this.date);
  }
}


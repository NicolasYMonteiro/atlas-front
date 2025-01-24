// model

export class SubTask {
  id: number;
  title: string;
  verif: boolean;

  constructor(id: number, title: string, verif: any) {
    this.id = id;
    this.title = title;
    this.verif = verif === "1" || verif === 1;  // Converte para true somente se o valor for "1" ou 1
      }

}

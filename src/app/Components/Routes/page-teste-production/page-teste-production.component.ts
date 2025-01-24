import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import {Question} from '../../../Models/question.model'

@Component({
  selector: 'app-page-teste-production',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './page-teste-production.component.html',
  styleUrl: './page-teste-production.component.scss'
})
export class PageTesteProductionComponent {

  header: string = '(Nome da Instituição de Ensino)\nAluno(a):____________________________________ Nº:_____ Série/turma:______ Valor:??? \nData:____/____/_____ Professor:????';
  enunciado: string = '';
  alternativa1: string = '';
  alternativa2: string = '';
  alternativa3: string = '';
  alternativa4: string = '';
  alternativa5: string = '';

  showcase: string = '';
  variante1: string = '';
  variante2: string = '';


  listQuestions: Question[] = [];
  count: number = 0;



  saveHeader(){
    this.showcase += `${this.header}\n\n\n\n`;
  }
  saveQuestion(){
    if(this.enunciado !== ''){
      const question = new Question(this.count, this.enunciado, '', '', '');


      question.getId(this.count);

      if(this.alternativa1 !== '' && this.alternativa2 === ''){
        alert('É necessário preencher pelo menos duas alternativas.');
        return;
      }
      
      question.getEnunciado(this.enunciado);

      question.addAlternativa(this.alternativa1, this.alternativa2, this.alternativa3, this.alternativa4, this.alternativa5);

      this.listQuestions.push(question);
      this.count++;

      question.mostrarQuestao();

      this.showcase += question.variantetext1;

    }else {
      alert('Preencha o enunciado da questão!');
    }

  }

  baixar(){
    const question = new Question(0, '', '', '', '');
    question.criarPDF(this.showcase);
  }
}

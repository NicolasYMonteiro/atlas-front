import {jsPDF} from 'jspdf';

export class Question {
    id: number;
    enunciado: string;
    alternativas: string[];
    alternativasV1: string[];
    alternativasV2: string[];
  
    variantetext1: string = '';
    variantetext2: string = '';
    variantetext3: string = '';
  
    constructor(id: number, enunciado: string, alternativa: string, alternativaV1: string, alternativaV2: string) {
      this.id = id;
      this.enunciado = enunciado;
      this.alternativas = alternativa ? [alternativa] : [];
      this.alternativasV1 = alternativaV1 ? [alternativaV1] : [];
      this.alternativasV2 = alternativaV2 ? [alternativaV2] : [];
  
    }
  
    getId(count: number): void {
      this.id = count;
    }
  
    getEnunciado(enunciado: string): void {
      this.enunciado = enunciado;
    }
  
    /*addAlternativa(a: string, b: string, c: string, d: string, e: string): void {
      const novasAlternativas = [a, b, c, d, e].filter(alternativa => alternativa !== ''); // Filtra alternativas vazias

      if (novasAlternativas.length < 2) {
        alert('É necessário preencher pelo menos duas alternativas.');
        return;
      }

      for(let i = 1; i < novasAlternativas.length; i++){
        this.alternativas.push(novasAlternativas[i])
      }

      for(let i = 0; i < novasAlternativas.length; i++){
        const numeroAleatorio = Math.floor(Math.random() * (novasAlternativas.length));
        if (!this.alternativasV1.includes(novasAlternativas[numeroAleatorio])) {
          this.alternativasV1.push(novasAlternativas[numeroAleatorio]);
      } else {
        i--;
        }
      }

      for(let i = 0; i < novasAlternativas.length; i++){
        const numeroAleatorio2 = Math.floor(Math.random() * (novasAlternativas.length));
        if (!this.alternativasV2.includes(novasAlternativas[numeroAleatorio2])) {
          this.alternativasV2.push(novasAlternativas[numeroAleatorio2]);
      } else {
        i--;
      }
      }



    }*/

      addAlternativa(a: string, b: string, c: string, d: string, e: string): void {
        const novasAlternativas = [a, b, c, d, e].filter(alternativa => alternativa !== '');
      
        // Adiciona alternativas à lista principal
        this.alternativas.push(...novasAlternativas);
      
        // Função para embaralhar array (Fisher-Yates shuffle)
        const shuffleArray = (array: string[]): string[] => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };
      
        // Cria versões embaralhadas das alternativas
        this.alternativasV1 = shuffleArray([...novasAlternativas]);
        this.alternativasV2 = shuffleArray([...novasAlternativas]);
      }
  
    mostrarQuestao(): void {
      function converter(index: number): string {
        return String.fromCharCode(65 + index);
      }
    
      const alterFormatada = this.alternativas.map((alternativa, index) => {
        return `${converter(index)}) ${alternativa}`;
      });
      const alterv1Formatada = this.alternativasV1.map((alternativaV1, index) => {
        return `${converter(index)}) ${alternativaV1}`;
      });
      const alterv2Formatada = this.alternativasV2.map((alternativaV2, index) => {
        return `${converter(index)}) ${alternativaV2}`;
      });
  
      this.variantetext1 = `${this.id + 1}] ${this.enunciado}\n\n${alterFormatada.join('\n')}\n\n`;
      this.variantetext2 = `${this.id + 1}] ${this.enunciado}\n\n${alterv1Formatada.join('\n')}\n\n`;
      this.variantetext3 = `${this.id + 1}] ${this.enunciado}\n\n${alterv2Formatada.join('\n')}\n\n`;
    }

    criarPDF(text: string): void {
      const doc = new jsPDF();
      doc.setFont('helvetica');
      doc.setFontSize(12);
    
      const maxWidth = 170; // Largura máxima da página
      const textLines = doc.splitTextToSize(text, maxWidth);
    
      // Adiciona as linhas de texto ao documento
      if (Array.isArray(textLines)) {
        doc.text(textLines.join('\n'), 20, 20);
      } else {
        console.error('textLines não é um array de strings:', textLines);
      }
    
      // ... (outras configurações e texto)
    
      this.downloadPDF(doc, 'arquivo.pdf');
    }

    private downloadPDF(doc: any, filename: string): void {
      const pdf = doc.output('datauristring');
      const downloadLink = document.createElement('a');
      downloadLink.href = pdf;
      downloadLink.download = filename;
      downloadLink.click();
    }
  
  
  
}

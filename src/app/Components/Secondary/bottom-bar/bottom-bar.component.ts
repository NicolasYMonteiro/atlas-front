import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bottom-bar',
  standalone: true, // Adicione essa linha se estiver usando standalone components
  imports: [],
  templateUrl: './bottom-bar.component.html'
})
export class BottomBarComponent {
  constructor(private router: Router) {}

  logout() {
    // Se estiver usando localStorage para armazenar o token de autenticação
    localStorage.removeItem('authToken'); 

    // Se usar sessionStorage, pode ser:
    // sessionStorage.removeItem('authToken');

    // Redirecionar para a tela de login
    this.router.navigate(['/login']);
  }
}

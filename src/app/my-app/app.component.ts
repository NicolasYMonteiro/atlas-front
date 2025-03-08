import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopBarComponent } from '../Components/Secondary/top-bar/top-bar.component';
import { SideBarComponent } from '../Components/Secondary/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { User } from '../Models/user.model';
import { UserService } from '../Services/userService/user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BottomBarComponent } from '../Components/Secondary/bottom-bar/bottom-bar.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, TopBarComponent, SideBarComponent, BottomBarComponent],
    templateUrl: './app.component.html'
  })
export class AppComponent implements OnInit {
  title = 'FrontEnd-Angular';
  users$ = new Observable<User[]>();
  isSideBarVisible: boolean = false;
  showBottomBar: boolean = true; // Variável para controlar a exibição
  isMobile: boolean = typeof window !== 'undefined' && window.innerWidth < 750;

  private ignoreClick = false; // Para evitar que o clique que abre a sidebar a feche imediatamente

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthentication();
      }
    });
    this.checkScreenSize(); // Checa no início

  }

  toggleSidebar() {
    
    const currentUrl = this.router.url;
    if (currentUrl !== '/login' && currentUrl !== '/register') {
      if (!this.isMobile) {
        this.isSideBarVisible = !this.isSideBarVisible;
      }
      // Aguarda um pequeno tempo antes de permitir a detecção de cliques externos
      if (this.isSideBarVisible) {
        this.ignoreClick = true;
        setTimeout(() => {
          this.ignoreClick = false;
        }, 100);
      }
    }
  }

  
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 750;
    }
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.ignoreClick) return; // Impede que o clique que abriu a sidebar a feche imediatamente

    const sidebar = document.querySelector('.section-sideBar');
    const toggleButton = document.querySelector('topbar'); // Ajuste conforme necessário para o botão que abre a sidebar

    if (
      this.isSideBarVisible && 
      sidebar && !sidebar.contains(event.target as Node) &&
      toggleButton && !toggleButton.contains(event.target as Node)
    ) {
      this.isSideBarVisible = false;
    }
  }

  checkAuthentication() {
    this.userService.getUserData().pipe(
      map(data => {
        const currentUrl = this.router.url;
        this.showBottomBar = currentUrl !== '/login' && currentUrl !== '/register';
        if (!data || data.length === 0) {
          if (currentUrl !== '/login' && currentUrl !== '/register') {
            this.router.navigate(['/login']);
          }
        }
        return data;
      }),
      catchError(error => {
        const currentUrl = this.router.url;
        if (currentUrl !== '/login' && currentUrl !== '/register') {
          this.router.navigate(['/login']);
        }
        return of(null);
      })
    ).subscribe(); 
  }
}

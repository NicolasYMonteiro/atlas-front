import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopBarComponent } from '../Components/Secondary/top-bar/top-bar.component';
import { SideBarComponent } from '../Components/Secondary/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { User } from '../Models/user.model';
import { UserService } from '../Services/userService/user.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'FrontEnd-Angular';

  //users: User[] = [];
  users$ = new Observable<User[]>();

  constructor(private userService: UserService, private router: Router){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthentication();
      }
    });
  }

  checkAuthentication() {
    this.userService.getUserData().pipe(
      map(data => {
        if (!data || data.length === 0) {
          const currentUrl = this.router.url;
          if (currentUrl !== '/login' && currentUrl !== '/register') {
            this.router.navigate(['/login']);
          }
        }
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



  isSideBarVisible: boolean = false;

  toggleSidebar() {
    const currentUrl = this.router.url;
    if (currentUrl !== '/login' && currentUrl !== '/register') {
      this.isSideBarVisible = !this.isSideBarVisible;
    }
  }
}
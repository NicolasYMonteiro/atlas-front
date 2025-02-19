import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';


@Component({
  selector: 'app-page-account',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './page-account.component.html'
})
export class PageAccountComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  userData = {
    name: '',
    email: '',
    id: '',
    tasks: []
  };

  ngOnInit() {
    console.log("data 2: ", this.userData)
    
    this.userService.getUserData().subscribe((data: any) => {
      if (data) {    
        const userData = Array.isArray(data) ? data[0] : data;
    
        this.userData.name = userData.name || '';
        this.userData.email = userData.email || '';
        this.userData.id = userData.id || '';
        this.userData.tasks = userData.tasks || [];
      }
    });
  }
}
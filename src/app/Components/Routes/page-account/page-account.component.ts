import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';


@Component({
  selector: 'app-page-account',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.scss'],
})
export class PageAccountComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  userData = {
    name: '',
    email: '',
    id: '',
  };

  ngOnInit() {
    
    this.userService.getUserData().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.userData.name = data[0].name;
        this.userData.email = data[0].email;
        this.userData.id = data[0].id;
      }
    });
  }
}
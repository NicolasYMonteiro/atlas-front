import { NgOptimizedImage } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'topbar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  @Output() sideBar = new EventEmitter<void>();

  constructor(private router: Router){}

  navigateToPage(){
    this.router.navigate(['/account']);
  }

  openSideBar() {
    this.sideBar.emit();
  }
}

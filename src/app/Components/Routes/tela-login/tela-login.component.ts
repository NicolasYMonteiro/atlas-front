import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.scss',
})


export class TelaLoginComponent {
  loginForm: FormGroup;
  messageInvalidCredentials = 'Invalid email or password!';
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  postButton() {
    if (this.loginForm.invalid) {
      this.message = this.messageInvalidCredentials;
      return;
    }
    this.message = '';

    this.userService.postLogin(this.loginForm.value).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('authToken', token);

        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      (error) => {
        this.message = this.messageInvalidCredentials;
        console.error('Erro ao logar:', error);
      }
    );
  }
}

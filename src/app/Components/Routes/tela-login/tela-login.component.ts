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
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './tela-login.component.html'
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
      senha: ['', Validators.required],
      rememberMe: [false],
    });
  }

  postButton() {
    console.log("dados enviados: ", this.loginForm.value);
    if (this.loginForm.invalid) {
      this.message = "Preencha todos os campos corretamente!";
      return;
    }
    this.message = '';

    this.userService.postLogin(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); // Salvar token no localStorage
      },
      error: (error) => {
        this.message = "Email ou senha incorretos!";
      }
    });

  }
}

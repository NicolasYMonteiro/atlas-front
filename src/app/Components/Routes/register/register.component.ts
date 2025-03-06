import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { UserService } from '../../../Services/userService/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html'
})


export class RegisterComponent {
  registerForm: FormGroup;
  messageError = 'Something went wrong, sorry :(';
  messageIncomplete = 'All fields are mandatory!';
  messagePasswordMismatch = 'Passwords do not match!';
  messageInvalidEmail = 'Please enter a valid email address!';
  message = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepete: ['', Validators.required],
    });
  }

  postButton() {
    console.log("dados: ", this.registerForm.value);
  
    if (this.registerForm.invalid) {
      if (this.registerForm.get('email')?.errors?.['email']) {
        this.message = this.messageInvalidEmail;
      } else {
        this.message = this.messageIncomplete;
      }
      return;
    }
  
    const formValues = this.registerForm.value; // Obtém os valores do formulário
    const { password, passwordRepete, ...rest } = formValues; // Remove passwordRepete
  
    if (password !== passwordRepete) {
      this.message = this.messagePasswordMismatch;
      return;
    }
  
    const userToSend = { ...rest, password }; // Garante que passwordRepete não seja enviado
  
    this.userService.postUser(userToSend).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('authToken', token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Erro ao registrar usuário:', error);
        this.message = this.messageError;
      }
    );
  }
  
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    try {
      const response = await this.authService.login(this.email, this.password).toPromise();
      localStorage.setItem('token', response?.token || '');
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.mensaje = error.error?.mensaje || 'Error al iniciar sesión';
    }
  }

}

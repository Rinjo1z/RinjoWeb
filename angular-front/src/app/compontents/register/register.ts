import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    email = '';
    password = '';
    mensaje = '';

    constructor(private authService: AuthService, private router: Router) { }

    async onSubmit() {
        try {
            const response = await this.authService.register(this.email, this.password).toPromise();
            localStorage.setItem('token', response?.token || '');
            this.router.navigate(['/home']);
        } catch (error: any) {
            this.mensaje = error.error?.mensaje || 'Error al registrar usuario';
        }
    }

}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './compontents/navbar/navbar';
import { Home } from "./compontents/home/home";
import { Gallery } from './compontents/gallery/gallery';
import { CommonModule } from '@angular/common';
import { Footer } from "./compontents/footer/footer";
import { Destacados } from "./compontents/destacados/destacados";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Home, Gallery, CommonModule, Footer, Destacados],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('angular-front');
}

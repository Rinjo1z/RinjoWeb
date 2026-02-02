import { Component } from '@angular/core';
import { Destacados } from "../destacados/destacados";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Destacados],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}

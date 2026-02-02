import { Component } from '@angular/core';
import { Gallery } from "../gallery/gallery";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Gallery],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

}

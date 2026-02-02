import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product';
import { CartService } from '../../services/cart/cart';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {

  item: any[] = [];
  filteredItems: any[] = [];
  selectedItem: any = null;
  selectedSize: string = "";
  selectedColor: string = "";

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.item = data.map((p: any) => ({
          ...p,
          sizes: p.size ? p.size.split(',').map((s: string) => s.trim()) : [],
          colors: p.color ? p.color.split(',').map((c: string) => c.trim()) : []
        }));
        this.filteredItems = this.item;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filter(category: string) {
    this.filteredItems = category === "todos" ? this.item : this.item.filter(i => i.category === category);
  }

  openModal(item: any) {
    this.selectedItem = item;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      ...product,
      size: this.selectedSize,
      color: this.selectedColor
    });

    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }

    this.router.navigate(['/cart']);
  }

}

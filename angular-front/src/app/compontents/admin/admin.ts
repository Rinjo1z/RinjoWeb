import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/product/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html'
})
export class Admin implements OnInit {
  producto: any = {};
  selectedFile: File | null = null;
  products: any[] = [];

  constructor(private product: Product) { }

  ngOnInit() {
    this.loadProducts();
    this.product.refresh$.subscribe(() => this.loadProducts());
  }

  loadProducts() {
    this.product.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error cargando productos:', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  crearProducto() {
    const formData = new FormData();
    formData.append('name', this.producto.name);
    formData.append('size', this.producto.size);
    formData.append('price', this.producto.price);
    formData.append('color', this.producto.color);
    formData.append('category', this.producto.category);
    formData.append('stock', this.producto.stock);
    formData.append('description', this.producto.description);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.product.createProduct(formData).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);
        // reset form
        this.producto = {};
        this.selectedFile = null;

        // close modal if open
        const modalEl = document.getElementById('crearProductoModal');
        if (modalEl) {
          const modal = (window as any).bootstrap?.Modal.getInstance(modalEl) || new (window as any).bootstrap.Modal(modalEl);
          modal.hide();
        }
      },
      error: (err) => console.error('Error al crear producto:', err)
    });
  }

  deleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.product.deleteProduct(id).subscribe({
      next: () => console.log('Producto eliminado'),
      error: (err) => console.error('Error eliminando producto:', err)
    });
  }

  // Edit flow
  editProducto: any = null;
  selectedFileEdit: File | null = null;

  openEdit(product: any) {
    // map title->name for editing convenience
    this.editProducto = { ...product };
    // show modal
    const modalEl = document.getElementById('editarProductoModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  onFileSelectedEdit(event: any) {
    this.selectedFileEdit = event.target.files[0];
  }

  updateProducto() {
    if (!this.editProducto) return;
    const formData = new FormData();
    formData.append('name', this.editProducto.title || this.editProducto.name);
    formData.append('size', this.editProducto.size);
    formData.append('price', this.editProducto.price);
    formData.append('color', this.editProducto.color);
    formData.append('category', this.editProducto.category);
    formData.append('stock', this.editProducto.stock);
    formData.append('description', this.editProducto.description);
    if (this.selectedFileEdit) formData.append('img', this.selectedFileEdit);

    this.product.updateProduct(this.editProducto._id, formData).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.editProducto = null;
        this.selectedFileEdit = null;
        const modalEl = document.getElementById('editarProductoModal');
        if (modalEl) {
          const modal = (window as any).bootstrap?.Modal.getInstance(modalEl) || new (window as any).bootstrap.Modal(modalEl);
          modal.hide();
        }
      },
      error: (err) => console.error('Error actualizando producto:', err)
    });
  }
}


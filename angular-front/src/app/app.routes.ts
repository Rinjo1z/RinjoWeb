import { Routes } from '@angular/router';
import { Gallery } from './compontents/gallery/gallery';
import { Home } from './compontents/home/home';
import { Navbar } from './compontents/navbar/navbar';
import { Products } from './compontents/products/products';
import { Contact } from './compontents/contact/contact';
import { Login } from './compontents/login/login';
import { Register } from './compontents/register/register';
import { Cart } from './compontents/cart/cart';
import { Admin } from './compontents/admin/admin';
import { RoleGuard } from './guards/role-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'gallery',
        component: Gallery
    },
    {
        path: 'navbar',
        component: Navbar
    },
    {
        path: 'products',
        component: Products
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [RoleGuard]
    }
];

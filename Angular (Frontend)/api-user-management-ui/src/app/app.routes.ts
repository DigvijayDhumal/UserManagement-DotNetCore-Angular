import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ProductComponent } from './products/product/product.component';

export const routes: Routes = [

  // 🔐 Login
  { path: '', component: LoginComponent },

  // 📊 Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // 👥 Users
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormComponent },

  // 🛒 Products (user-wise)
  { path: 'products/:userId', component: ProductComponent },

  // ❌ Fallback
  { path: '**', redirectTo: '' }
];

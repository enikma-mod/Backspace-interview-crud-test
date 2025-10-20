import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
//   { path: 'products', component: ProductListComponent }
];

import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
//   { path: 'products', component: ProductListComponent }
];

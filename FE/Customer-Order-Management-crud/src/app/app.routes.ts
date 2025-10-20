import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home.component';
import { CustomerComponent } from './Components/Customer/customer.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { CustomerListComponent } from './Components/Admin/customer-list/customer-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: '', redirectTo: 'customers', pathMatch: 'full' },
    {path: 'register', component: CustomerListComponent}
];

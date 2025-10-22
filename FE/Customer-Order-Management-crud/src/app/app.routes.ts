import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home.component';
import { CustomerComponent } from './Components/Customer/customer.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './Components/Register/register/register.component';
import { CustomerDashboardComponent } from './Components/Customer/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuardGuard } from '../app/Components/Utils/Auth Guard/auth-guard.guard';
import { adminGuardGuard } from './Components/Utils/Auth Guard/admin-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    { path: 'customer-dashboard', component: CustomerDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    {
        path: 'customer-dashboard',
        component: CustomerDashboardComponent,
        canActivate: [authGuardGuard],
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuardGuard, adminGuardGuard],
    },
];

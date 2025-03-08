import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Routes/home/home.component';
import { AllListPageComponent } from '../Components/Routes/task-list/all-list-page.component';
import { RegisterComponent } from '../Components/Routes/register/register.component';
import { TelaLoginComponent } from '../Components/Routes/tela-login/tela-login.component';
import { PageAccountComponent } from '../Components/Routes/account/page-account.component';
import { AboutComponent } from '../Components/Routes/about/about.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'all-lists', component: AllListPageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: TelaLoginComponent},
    {path: 'account', component: PageAccountComponent},
    {path: 'about', component: AboutComponent}

];

import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Routes/home/home.component';
import { AllListPageComponent } from '../Components/Routes/all-list-page/all-list-page.component';
import { RegisterComponent } from '../Components/Routes/register/register.component';
import { TelaLoginComponent } from '../Components/Routes/tela-login/tela-login.component';
import { PageAccountComponent } from '../Components/Routes/page-account/page-account.component';
import { PageTesteProductionComponent } from '../Components/Routes/page-teste-production/page-teste-production.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'all-lists', component: AllListPageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: TelaLoginComponent},
    {path: 'account', component: PageAccountComponent},
    {path: 'testProduction', component: PageTesteProductionComponent}

];

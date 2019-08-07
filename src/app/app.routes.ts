import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { NotfoundpageComponent } from './shared/notfoundpage/notfoundpage.component';
import { RegisterComponent } from './login/register/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: '**', component: NotfoundpageComponent }
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
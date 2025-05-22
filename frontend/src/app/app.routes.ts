import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BoardListComponent } from './boards/board-list/board-list.component';
import { authGuard } from './core/guards/auth.guard';
import { BoardViewComponent } from './boards/board-view/board-view.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: RegisterComponent },
    {
      path: '',
      redirectTo: 'tableros',
      pathMatch: 'full'
    },
    {
      path: 'tableros',
      children: [
        {
          path: '',
          component: BoardListComponent,
          canActivate: [authGuard]
        },
        {
          path: ':id',
          component: BoardViewComponent,
          canActivate: [authGuard]
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'tableros'
    }
  
  ];
  

  

  
  
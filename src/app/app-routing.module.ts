import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardPersonaGuard } from './persona/guard-persona.guard';
import { RefreshGuard } from './persona/guard/refresh.guard';

const routes: Routes = [{
  path: 'home',
  loadChildren: ()=> import('./personaje/listar/listar.module').then(m => m.ListarPageModule),
  canActivate: [ GuardPersonaGuard]
},
  {
    path: 'home/agregar',
    loadChildren: () => import('./personaje/agregar/agregar.module').then( m => m.AgregarPageModule),
    canActivate: [ GuardPersonaGuard]
  },
  {
    path: 'home/modificar/:nombre',
    loadChildren: () => import('./personaje/modificar/modificar.module').then( m => m.ModificarPageModule),
    canActivate: [ GuardPersonaGuard]
  },
  {
    path: '',
    loadChildren: () => import('./persona/login/login.module').then( m => m.LoginPageModule),
    canActivate: [RefreshGuard]

  },
  {
    path: 'register',
    loadChildren: () => import('./persona/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

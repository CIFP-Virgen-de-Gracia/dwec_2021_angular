import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './views/articles/articles.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'articles', component: ArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

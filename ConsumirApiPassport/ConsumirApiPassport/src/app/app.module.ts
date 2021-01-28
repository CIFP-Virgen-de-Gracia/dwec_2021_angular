import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './views/articles/articles.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { ArticleInsertedComponent } from './components/article-inserted/article-inserted.component';
import { ArticleUpdatedComponent } from './components/article-updated/article-updated.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesComponent,
    DatosUsuarioComponent,
    ArticleInsertedComponent,
    ArticleUpdatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  user: any;
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
  }

  /**
   * Petición get para obtener los artículos
   */
  public getArticles = () => {
    const url = "http://localhost:8000/api/articles";
    this.user = this.loginService.getUser();
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.user.access_token}` });

    return this.http.get(url, { headers: headers });
  };

  /**Petición delete */
  public deleteArticle = (article: any) => {
    const url = "http://localhost:8000/api/articles/" + article.id;
    if (!this.user)
      this.user = this.loginService.getUser();
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.user.access_token}` })

    return this.http.delete(url, { headers: headers });
  }

  /**Petición post para insertar */
  public insertArticle = (titulo: string, cuerpo: string) => {
    const url = "http://localhost:8000/api/articles";

    if (!this.user)
      this.user = this.loginService.getUser();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.access_token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(url, { 'title': titulo, 'body': cuerpo }, { headers: headers });
  }

  /**Petición put para actualizar */
  public updateArticle = (id: string, titulo: string, cuerpo: string) => {
    const url = "http://localhost:8000/api/articles/"+id;

    if (!this.user)
      this.user = this.loginService.getUser();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.access_token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(url, { 'title': titulo, 'body': cuerpo }, { headers: headers });
  }

}

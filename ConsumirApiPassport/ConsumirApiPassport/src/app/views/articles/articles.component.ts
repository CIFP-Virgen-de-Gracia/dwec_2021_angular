import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: any[];
  insert: boolean;

  constructor(private articleService: ArticlesService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['']);
    this.articles = [];
    this.insert = false;
  }

  ngOnInit(): void {
    this.getArticles();
  }

  /**
   * Realiza una petición al API para obtener los artículos, para ello se subscribe
   * a la función correspondiente implementada en el servicio
   */
  getArticles() {
    this.articles = [];
    this.articleService.getArticles().subscribe(
      (response: any) => {
        let articles = response;
        console.log(response);
        articles.forEach((element: { id: any; title: any; body: any; }) => {
          let article = {
            'id': element.id,
            'titulo': element.title,
            'cuerpo': element.body,
            'edit': false
          };
          this.articles.push(article);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  borrar(article: any) {
    this.articleService.deleteArticle(article).subscribe(
      (response: any) => {
        //Se ha borrado el elemento de la BDD por lo tanto lo tenemos que borrar del array
        let index = this.articles.indexOf(article);
        if(index != -1)
          this.articles.splice(index, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertar() {
    this.insert = !this.insert;
  }

  realizadoInsert(insert: boolean) {
    this.insert = !this.insert;
    if(insert)
      this.getArticles(); //podríamos optimizar la recuperación paginada si tuviese un formateo complejo ...
  }


  editar(article: any) {
    article.edit = !article.edit;
  }

  realizadoUpdate(article: any) {
    article.edit = !article.edit;
  }
}

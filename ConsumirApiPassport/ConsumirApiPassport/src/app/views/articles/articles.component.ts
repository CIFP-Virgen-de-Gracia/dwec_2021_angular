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

  articles: any[]; //Array de artículos
  insert: boolean; //Nos sirve para ver si tiene que mostrarse el hijo o no

  constructor(private articleService: ArticlesService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['']); //Si no estamos loggeados vamos a la vista de login
    this.articles = []; //Inicializamos el array de artículos a vacío y no mostramos el componente de inserción
    this.insert = false;
  }

  ngOnInit(): void {
    this.getArticles(); //Obtenemos los articulos
  }

  /**
   * Realiza una petición al API para obtener los artículos, para ello se subscribe
   * a la función correspondiente implementada en el servicio
   */
  getArticles() {
    this.articles = []; //Antes de obtener los artículos, limpia el array
    this.articleService.getArticles().subscribe(
      (response: any) => {
        let articles = response;
        articles.forEach((element: { id: any; title: any; body: any; }) => {
          let article = {
            'id': element.id,
            'titulo': element.title,
            'cuerpo': element.body,
            'edit': false //Elemento que me va a indicar si el artículo se va a editar o no, 
            //para que muestre el componente de edición.
          };
          this.articles.push(article);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**Para borrar un artículo, nos subscribimos a la petición que hace el servicio
   * al api y procesamos la respuesta. Después borramos el artículo del array de artículos
  */
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

  /** Si el usuario pulsa Insertar, se cambia la variable que indica si debe
   * mostrar el componente de inserción de artículos o no
  */
  insertar() {
    this.insert = !this.insert;
  }

  /**Esta función se ejecuta cuando el componente hijo (article-inserted) se ha ejecutado
   * Si viene con el argumento a true sindica que se ha insertado y si viene a false que no
   */
  realizadoInsert(insert: boolean) {
    this.insert = !this.insert;
    if(insert) //Si se ha insertado actualizamos los artículos que visualizamos subscribiéndonos a la llamada del API
      this.getArticles(); //podríamos optimizar la recuperación paginada si tuviese un formateo complejo ...
  }

  /** Si el usuario ha pulsado editar, se ejecuta esta función y activa
   * la variable edit de dicho artículo que es la que hará que en esa fila se muestre o no
   * el componente hijo article-updated
  */
  editar(article: any) {
    article.edit = !article.edit;
  }

  /**Esta función se ejecuta cuando el componente hijo article-updated se ha ejecutado para
   * que deje de mostrarse dicho componente.
   */
  realizadoUpdate(article: any) {
    article.edit = !article.edit;
  }
}

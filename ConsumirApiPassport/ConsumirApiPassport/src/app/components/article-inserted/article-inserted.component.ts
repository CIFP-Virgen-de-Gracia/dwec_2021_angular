import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-article-inserted',
  templateUrl: './article-inserted.component.html',
  styleUrls: ['./article-inserted.component.scss']
})
export class ArticleInsertedComponent implements OnInit {

  insertArticle: FormGroup;
  submitted = false;
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private articleService: ArticlesService, private router: Router) { 
    this.insertArticle = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //Si no estamos loggeados nos vamos a la página de login
    if(!this.loginService.isUserSignedIn())
    {
      this.router.navigate(['']);
    }
  }

  get formulario() { return this.insertArticle.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.insertArticle.invalid) {
      return;
    }

    //Cogemos los datos del formulario
    let datosArticulo = this.insertArticle.value;
    const titulo = datosArticulo.titulo;
    const cuerpo = datosArticulo.cuerpo;

    this.insertArticle.reset();
    
    this.insertar(titulo, cuerpo);
  }

  insertar(titulo: string, cuerpo: string) {
    this.articleService.insertArticle(titulo, cuerpo).subscribe(
      (response: any) => {
        this.accionRealizada.emit(true);
        //Una vez insertado el artículo lo comunicamos al padre para que no lo muestre, a su vez éste podrá recargar los datos
      },
      (error) => {
        console.log(error);
        this.accionRealizada.emit(false);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.insertArticle.reset();
    this.accionRealizada.emit(false); //Cancelamos, por tanto se ha realizado la acción pero no se ha insertado 
  }
}

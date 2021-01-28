import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-article-updated',
  templateUrl: './article-updated.component.html',
  styleUrls: ['./article-updated.component.scss']
})
export class ArticleUpdatedComponent implements OnInit {

  updateArticle: FormGroup; //Formulario
  submitted = false;
  @Input() article: any; //Variable que recibe de fuera (concretamente la recibe del padre mediante el template)
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter(); //Permitirá comunicar al padre que la acción se ha concluído

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private articleService: ArticlesService, private router: Router) { 
    this.updateArticle = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a /articles
    if(!this.loginService.isUserSignedIn())
    {
      this.router.navigate(['']);
    }
  }

  get formulario() { return this.updateArticle.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.updateArticle.invalid) {
      return;
    }

    //Cogemos los datos del formulario
    let datosArticulo = this.updateArticle.value;
    const titulo = datosArticulo.titulo;
    const cuerpo = datosArticulo.cuerpo;

    this.onReset();
    //Nos subscribimos a la petición de update que se implementa en el servicio
    this.update(this.article.id, titulo, cuerpo);
  }

  update(id: string, titulo: string, cuerpo: string) {
    this.articleService.updateArticle(id, titulo, cuerpo).subscribe(
      (response: any) => {
        //Como se ha realizado con éxito la actualización, modificamos la variable del template sin tener que volver
        //a hacer la petición al servicio web
        this.article.titulo = titulo;
        this.article.cuerpo = cuerpo;
        this.accionRealizada.emit();
        //Una vez insertado el artículo lo comunicamos al padre para que no lo muestre
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.updateArticle.reset();
    this.accionRealizada.emit();
  }

  cancel() {
    this.onReset();
  }


}

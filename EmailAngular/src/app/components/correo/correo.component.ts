import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: any;

  constructor(private route: ActivatedRoute) {
    this.correo = {
      titulo: "",
      cuerpo: "",
      emisor: ""
    }
   }

  ngOnInit(): void {
    //Obtenemos el parámetro enviado en la ruta (ver lista-correos.component.ts)
    const datosRecibidos = this.route.snapshot.paramMap.get('correo');
    this.correo = JSON.parse(datosRecibidos);
  }

}

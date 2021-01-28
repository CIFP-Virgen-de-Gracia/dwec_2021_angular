import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss']
})
export class DatosUsuarioComponent implements OnInit {

  user: any;
  constructor(private loginService: LoginService, private router: Router) { 
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}

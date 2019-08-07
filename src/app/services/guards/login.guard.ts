import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

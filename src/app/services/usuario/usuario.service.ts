import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICE } from '../../config/config';
import { map } from "rxjs/operators";
import swal from "sweetalert";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  url = URL_SERVICE;

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem("id", usuario._id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  loginGoogle(token: string) {
    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.usuario.id, res.token, res.usuario);
          return true;
        })
      )
  }

  login(usuario: Usuario, recuerdame: boolean) {

    if (recuerdame) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    return this.http.post(`${this.url}/login`, usuario)
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.usuario.id, res.token, res.usuario);
          return true;
        })
      )

  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }

  crearUsuario(usuario: Usuario) {

    return this.http.post(`${this.url}/usuarios`, usuario)
      .pipe(
        map((res: any) => {
          swal("Usuario creado", usuario.email, "success");
          return res.usuario;
        })
      )
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${this.url}/usuarios/${usuario._id}?token=${this.token}`, usuario)
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.usuario._id, this.token, res.usuario)
          swal('Usuario actualizado', usuario.nombre, 'success');

          return true;
        })
      );
  }
}

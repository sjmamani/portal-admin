import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICE } from '../../config/config';
import swal from "sweetalert";
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  url = URL_SERVICE;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem("id", usuario._id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  loginGoogle(token: string) {
    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.usuario.id, res.token, res.usuario, res.menu);
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
          this.guardarStorage(res.usuario.id, res.token, res.usuario, res.menu);
          return true;
        }),
        catchError(err => {
          swal("Error en el login", err.error.message, "error");
          return throwError(err);
        })
      )

  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");
    this.router.navigate(["/login"]);
  }

  crearUsuario(usuario: Usuario) {

    return this.http.post(`${this.url}/usuarios`, usuario)
      .pipe(
        map((res: any) => {
          swal("Usuario creado", usuario.email, "success");
          return res.usuario;
        }
        ),
        catchError(err => {
          swal(err.error.message, err.error.errors.message, "error");
          return throwError(err);
        })
      )
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${this.url}/usuarios/${usuario._id}?token=${this.token}`, usuario)
      .pipe(
        map((res: any) => {
          if (usuario._id === this.usuario._id) {
            this.guardarStorage(res.usuario._id, this.token, res.usuario, res.menu)
          }
          swal('Usuario actualizado', usuario.nombre, 'success');

          return true;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        swal(res.message, res.usuario.email, 'success');
        this.guardarStorage(id, this.token, res.usuario, res.menu);
      })
      .catch(res => {
        console.log(res);
      });
  }

  cargarUsuarios(desde: number) {
    return this.http.get(`${URL_SERVICE}/usuarios?desde=${desde}`);
  }

  buscarUsuarios(termino: string) {
    return this.http.get(`${URL_SERVICE}/busqueda/coleccion/usuarios/${termino}`)
      .pipe(
        map((res: any) => {
          return res.usuarios;
        })
      )
  }

  borrarUsuario(id: string) {
    return this.http.delete(`${URL_SERVICE}/usuarios/${id}?token=${this.token}`)
      .pipe(
        map(res => {
          swal("Usuario eliminado", "Se ha eliminado el usuario", "success");
          return true;
        })
      )
  }
}

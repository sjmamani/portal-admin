import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  totalUsuarios: number = 0;
  desde: number = 0;
  cargando: boolean;

  constructor(
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(res => this.cargarUsuarios());
  }

  abrirModal(id: string) {
    this._modalUploadService.abrirModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((res: any) => {
        this.totalUsuarios = res.total;
        this.usuarios = res.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde < 0 || desde > this.totalUsuarios) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (this._usuarioService.usuario._id === usuario._id) {
      swal("No se puede eliminar", "No es posible eliminarse a si mismo", "error");
      return;
    }

    swal({
      title: "¿Está seguro?",
      text: `Está a punto de eliminar a ${usuario.nombre}`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then(borrar => {
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(seBorro => {
              this.cargarUsuarios();
            });
        }
      })
  }

  actualizarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor( // 'public' para que se pueda usar en el html
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) {
      this.usuario = this._usuarioService.usuario;
     } 

  ngOnInit() {
    this._sidebar.cargarMenu();
  }

}

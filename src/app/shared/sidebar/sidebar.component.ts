import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) { } // 'public' para que se pueda usar en el html

  ngOnInit() {
  }

}

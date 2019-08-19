import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public _httpClient: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    return this._httpClient.get(`${URL_SERVICE}/medicos`)
      .pipe(
        map((res: any) => {
          this.totalMedicos = res.total;
          return res.medicos;
        })
      );
  }

  buscarMedicos(termino: string) {
    return this._httpClient.get(`${URL_SERVICE}/busqueda/coleccion/medicos/${termino}`)
      .pipe(
        map((res: any) => res.medicos)
      )
  }

  borrarMedico(id: string) {
    return this._httpClient.delete(`${URL_SERVICE}/medicos/${id}?token=${this._usuarioService.token}`)
      .pipe(
        map(() => {
          swal("Médico eliminado", "Se ha eliminado el médico", "success");
          return true;
        })
      )
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      // actualizo
      return this._httpClient.put(`${URL_SERVICE}/medicos/${medico._id}?token=${this._usuarioService.token}`, medico)
        .pipe(
          map((res: any) => {
            swal("Médico actualizado", medico.nombre, "success");
            return res.medico;
          })
        )
    } else {
      // creo
      return this._httpClient.post(`${URL_SERVICE}/medicos?token=${this._usuarioService.token}`, medico)
        .pipe(
          map((res: any) => {
            swal("Médico creado", medico.nombre, "success");
            return res.medico;
          })
        )
    }
  }

  obtenerMedico(id: string) {
    return this._httpClient.get(`${URL_SERVICE}/medicos/${id}`)
      .pipe(
        map((res: any) => res.medico)
      )
  }
}

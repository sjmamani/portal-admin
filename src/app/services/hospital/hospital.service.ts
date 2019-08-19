import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICE } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from "rxjs/operators";
import swal from "sweetalert";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  url = URL_SERVICE;

  constructor(
    private _httpClient: HttpClient,
    private _subirArchivoService: SubirArchivoService
  ) {
    this.token = localStorage.getItem('token');
  }

  cargarHospitales() {
    return this._httpClient.get(`${URL_SERVICE}/hospitales`);
  }

  obtenerHospital(id: string) {
    return this._httpClient.get(`${URL_SERVICE}/hospitales/${id}`)
      .pipe(
        map((res: any) => res.hospital)
      );
  }

  borrarHospital(id: string) {
    return this._httpClient.delete(`${URL_SERVICE}/hospitales/${id}?token=${this.token}`)
      .pipe(
        map(res => {
          swal("Hospital eliminado", "Se ha eliminado el hospital", "success");
          return true;
        })
      );
  }

  crearHospital(nombre: string) {
    const hospital = new Hospital(nombre);
    return this._httpClient.post(`${this.url}/hospitales?token=${this.token}`, hospital)
      .pipe(
        map((res: any) => {
          swal("Hospital creado", nombre, "success");
          return res.hospital;
        },
          (err: any) => {
            swal("Error", err.message, "error");
            return;
          }
        )
      )
  }

  buscarHospitales(termino: string) {
    return this._httpClient.get(`${URL_SERVICE}/busqueda/coleccion/hospitales/${termino}`)
      .pipe(
        map((res: any) => {
          return res.hospitales;
        })
      )
  }

  actualizarHospital(hospital: Hospital) {
    return this._httpClient.put(`${this.url}/hospitales/${hospital._id}?token=${this.token}`, hospital)
      .pipe(
        map((res: any) => {
          swal('Hospital actualizado', hospital.nombre, 'success');
          return true;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'hospitales', id)
      .then((res: any) => {
        swal(res.message, res.hospital.nombre, 'success');
      })
      .catch(res => {
        console.log(res);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalHospitales: number = 0;
  cargando: boolean;

  constructor(
    private _modalUploadService: ModalUploadService,
    private _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(res => this.cargarHospitales());
  }

  abrirModal(id: string) {
    this._modalUploadService.abrirModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((res: any) => {
        this.totalHospitales = res.total;
        this.hospitales = res.hospitales;
        this.cargando = false;
      });
  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: "¿Está seguro?",
      text: `Está a punto de eliminar a ${hospital.nombre}`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then(borrar => {
        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id)
            .subscribe(seBorro => {
              this.cargarHospitales();
            });
        }
      })
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  modalCreacion() {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese nombre para el hospital",
          type: "text",
        },
      },
    })
      .then(nombre => {
        if (nombre) {
          this._hospitalService.crearHospital(nombre)
            .subscribe((res: Hospital) => this.hospitales.push(res));
        }
      })
  }


}

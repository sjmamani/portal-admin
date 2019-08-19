import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarMedico(id);
      }
    });
    this._modalUploadService.notificacion
      .subscribe(res => this.medico.img = res.medico.img);
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe((res: any) => this.hospitales = res.hospitales);
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        this.medico._id = medico._id; // inicializo el médico
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  cambiarImagen() {
    this._modalUploadService.abrirModal('medicos', this.medico._id);
  }

}

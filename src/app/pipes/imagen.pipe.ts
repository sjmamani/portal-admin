import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = `${URL_SERVICE}/img`;

    if (!img) {
      return `${url}/usuarios/xxx`;
    }

    if (img.indexOf('https') >= 0) { // si es una string con la palabra 'http'
      return img;
    }

    switch (tipo) {

      case 'usuario':
        url = `${url}/usuarios/${img}`
        break;

      case 'medico':
        url = `${url}/medicos/${img}`
        break;

      case 'hospital':
        url = `${url}/hospitales/${img}`
        break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url = `${url}/usuarios/xxx`;
    }

    return url;
  }
}

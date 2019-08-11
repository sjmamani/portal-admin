import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log("Se subió la imagen");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Error al subir la imagen");
            reject(xhr.response);
          }
        }
      };

      const url = `${URL_SERVICE}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });

  }

}

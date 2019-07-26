import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    tema: "default",
    temaUrl: "assets/css/colors/default-dark.css"
  };

  constructor() {
    this.obtenerAjustes();
  }

  guardarAjustes() {
    // console.log("Guardado en el Storage");
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  obtenerAjustes() {
    if (localStorage.getItem("ajustes")) { // si hay algún ajuste guardado
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      // console.log("Obteniendo del localStorage");
      this.aplicarTema(this.ajustes.tema);
    } else {
      // console.log("No hay nada en el storage");
      this.aplicarTema(this.ajustes.tema); // usa valores por defecto - default-dark
    }
  }

  aplicarTema(tema: string) { // aplicar tema al dom
    const url = `assets/css/colors/${tema}.css`;
    document.getElementById("tema").setAttribute("href", url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes(); // guardar en el localStorage
  }
}

interface Ajustes {
  tema: string;
  temaUrl: string;
} 

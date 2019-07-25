import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProgreso') inputProgreso: ElementRef;
  
  @Input('nombre') leyenda: string = "Leyenda";
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    // let elemHTML: any = document.getElementsByName("progreso")[0];

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
  
    // elemHTML.value = this.progreso;
    this.inputProgreso.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    if (this.progreso >= 100 && valor > 100) {
      this.progreso = 100;
      return;
    }
    this.progreso += valor;

    this.cambioValor.emit(this.progreso);

    this.inputProgreso.nativeElement.focus();
  }

}

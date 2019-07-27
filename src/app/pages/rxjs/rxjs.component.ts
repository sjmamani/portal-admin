import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription; // Referencia al observable

  constructor() {

    this.subscription = this.devolverObservable()
      // .pipe(retry(2)) // si hay un error, continua observando
      .subscribe(
        nro => console.log(nro),
        error => console.error(error),
        () => console.log("Termino!")
      )
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // para cuando cierre la página, dejé de escuchar las subscriptions
  }

  devolverObservable(): Observable<any> {
    return new Observable((observer: any) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida); // idem resolve()

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error("Auxilio!");
        // }

      }, 1000);
    }).pipe(
      map((res: any) => res.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}

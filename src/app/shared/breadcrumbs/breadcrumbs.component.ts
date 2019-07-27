import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getRouterData().subscribe(data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: "Description",
        content: this.titulo
      }

      this.meta.updateTag(metaTag);

    })
  }

  ngOnInit() { }

  getRouterData() {
    return this.router.events.pipe(
      // Filtra por aquellos eventos que sean del tipo ActivationEnd
      filter(event => event instanceof ActivationEnd),
      // Filtra por aquellos eventos que tengan el atributo firstChild null
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      // De los eventos filtrados, solo me interesa el atributo data
      map(event => event.snapshot.data)
    )
  }

}

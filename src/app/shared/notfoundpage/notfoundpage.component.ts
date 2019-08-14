import { Component, OnInit } from '@angular/core';

declare function init_plugins()

@Component({
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.component.html',
  styles: []
})
export class NotfoundpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}

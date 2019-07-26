import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService } from './service.index';


@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularSignaturePadModule } from '../../node_modules/angular-signature-pad/angular-signature-pad';
import { SignaturePad } from 'angular2-signaturepad';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignaturePadModule,
    AngularSignaturePadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

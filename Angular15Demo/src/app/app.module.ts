import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorDirective } from './color.directive';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkListboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ColorDirective
  ],
  providers: [
    provideImageKitLoader("https://ik.imagekit.io/arungudelli/")
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { MatModule } from './appModules/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './pages/form/dialog-box/dialog-box.component';
import { BottomSheetComponent } from './pages/form/bottom-sheet/bottom-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    DialogBoxComponent,
    BottomSheetComponent
  ],
  imports: [
    BrowserModule,
    MatModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

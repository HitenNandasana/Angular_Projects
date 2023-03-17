import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
// import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule,
    // RichTextEditorModule
  ],
  // providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

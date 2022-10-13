import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { DebugComponent } from './debug/debug.component';
import { AdDirective } from './ad/ad.directive';
import { AdsComponent } from './ads/ads.component';
import { AdService } from './ad/ad.service';
import { AdComponent } from './ad/ad.component';
import { AdBannerComponent } from './ad/adbanner.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { CardComponent } from './card/card.component';
import { ElementComponent } from './element/element.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { BindingComponent } from './binding/binding.component';
import { PipeComponent } from './pipe/pipe.component';
import { CubePipe } from './cube.pipe';
import { SvgComponent } from './svg/svg.component';
import { HighlightDirective } from './highlight.directive';
import { DirectiveComponent } from './directive/directive.component';
import { ImagesComponent } from './images/images.component';
import { NgOptimizedImage } from '@angular/common';
import { DebugService } from './debug.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormComponent } from './form/form.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { PasswordValidateDirective } from './form/password-validate.directive';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    DebugComponent,
    AdDirective,
    AdsComponent,
    AdComponent,
    AdBannerComponent,
    ParentComponent,
    ChildComponent,
    CardComponent,
    ElementComponent,
    PopupComponent,
    BindingComponent,
    PipeComponent,
    CubePipe,
    SvgComponent,
    HighlightDirective,
    DirectiveComponent,
    ImagesComponent,
    PagenotfoundComponent,
    FormComponent,
    ReactiveformComponent,
    PasswordValidateDirective,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(injector: Injector) {
    const PopElement = createCustomElement(PopupComponent, { injector });

    customElements.define('pop-element', PopElement);
  }
}

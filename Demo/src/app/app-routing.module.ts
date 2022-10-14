import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdComponent } from './ad/ad.component';
import { BindingComponent } from './binding/binding.component';
import { CustompreloadService } from './custompreload.service';
import { DebugComponent } from './debug/debug.component';
import { DirectiveComponent } from './directive/directive.component';
import { ElementComponent } from './element/element.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ParentComponent } from './parent/parent.component';
import { PipeComponent } from './pipe/pipe.component';
import { PostsComponent } from './posts/posts.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { EmpDetailsComponent } from './routing/emp-details/emp-details.component';
import { RoutingComponent } from './routing/routing.component';
import { SubjectComponent } from './subject/subject.component';
import { SvgComponent } from './svg/svg.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'ad', title: 'Ad', component: AdComponent },
  { path: 'parent', title: 'Parent', component: ParentComponent },
  { path: 'element', title: 'Element', component: ElementComponent },
  { path: 'binding', title: 'Binging', component: BindingComponent },
  { path: 'pipe', title: 'Pipe', component: PipeComponent },
  { path: 'svg', title: 'Svg', component: SvgComponent },
  { path: 'directive', title: 'Directive', component: DirectiveComponent },
  { path: 'image', title: 'Image', component: ImagesComponent },
  { path: 'debug', title: 'Debug', component: DebugComponent },
  { path: 'route', title: 'Routing', data: { preload: true }, loadChildren: () => import('./routing/routing.module').then(m => m.RoutingModule) },
  // { path: 'empDetail', title: 'Details', component: EmpDetailsComponent },
  { path: 'form', title: 'Form', component: FormComponent },
  { path: 'reactiveform', title: 'Reactive Form', component: ReactiveformComponent },
  { path: 'posts', title: 'Posts', component: PostsComponent },
  { path: 'subject', title: 'Subject', component: SubjectComponent },
  { path: 'storage', title: 'Localstorage', component: LocalstorageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustompreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('app loaded');
  }
}

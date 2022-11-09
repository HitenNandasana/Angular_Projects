import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'add',
    title: 'Add Product',
    component: AddUpdateProductComponent
  },
  {
    path: 'edit/:id',
    title: 'Edit Product',
    component: AddUpdateProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

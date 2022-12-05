import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ProductService } from 'src/app/appServices/product/product.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let productService: ProductService
  let fixture: ComponentFixture<ProductComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
      providers: [ProductService,
        { provide: Router, useValue: router }],
      declarations: [ProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have viewProduct method Called', () => {
    const obj = {
      name: 'gfgfdg',
      slug: 'gdfg',
      description: 'fgfdgfd',
      price: '5445',
      image: 'gfg.png'
    }
    spyOn(component, 'viewProduct').and.callThrough();
    component.viewProduct(obj);
    expect(component.productObj).toBe(obj);
  });

  it('should have addProduct method Called', () => {
    spyOn(component, 'addProduct').and.callThrough();
    component.addProduct();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/product/add']);
  });

  it('should have editProduct method Called', () => {
    const obj = {
      id: '12',
      name: 'gfgfdg',
      slug: 'gdfg',
      description: 'fgfdgfd',
      price: '5445',
      image: 'gfg.png'
    }
    spyOn(component, 'editProduct').and.callThrough();
    component.editProduct(obj);
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/product/update', obj.id]);
  });

  it('should have deleteProduct method Called', () => {
    const index = 3;
    const obj = {
      id: '12',
      name: 'gfgfdg',
      slug: 'gdfg',
      description: 'fgfdgfd',
      price: '5445',
      image: 'gfg.png'
    }
    spyOn(component, 'deleteProduct').and.callThrough();
    component.deleteProduct(index, obj);
    expect(productService.getProductData).not.toContain(obj);
  });
});

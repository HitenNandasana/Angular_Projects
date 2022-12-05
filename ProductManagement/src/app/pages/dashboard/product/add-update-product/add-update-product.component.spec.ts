import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';
import { ProductService } from 'src/app/appServices/product/product.service';
import { environment } from 'src/environments/environment';

import { AddUpdateProductComponent } from './add-update-product.component';

describe('AddUpdateProductComponent', () => {
  let component: AddUpdateProductComponent;
  let fixture: ComponentFixture<AddUpdateProductComponent>;
  let productService: ProductService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()],
      providers: [AuthService,
      ],
      declarations: [AddUpdateProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProductComponent);
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onFileSelect function to be called', (): void => {
    let event = {
      target: {
        files: [
          {
            name: 'abc.png'
          }
        ]
      }
    }
    component.onFileSelect(event);
  });

  it('should isNumber function to be called', () => {
    let evt = {
      charCode: 52,
      which: 52,
      keyCode: 52
    }
    expect(component).toBeTruthy();
    spyOn(component, 'isNumber').and.callThrough();
    component.isNumber(evt);
    expect(component.isNumber(evt)).toBe(true);

  });

  it('should isNumber function to be called', () => {
    let evt = {
      charCode: 32,
      which: 32,
      keyCode: 32
    }
    expect(component).toBeTruthy();
    spyOn(component, 'isNumber').and.callThrough();
    component.isNumber(evt);
    expect(component.isNumber(evt)).toBe(false);
  });

  it('should have add function to ba called', fakeAsync(() => {
    component.addProductForm?.setValue({
      name: 'fgsdg',
      slug: 'ddg',
      description: 'fdgfdgfd',
      price: 34324,
      image: File
    })
    component.add();

    const data = {
      data: {
        name: 'rg',
        slug: 'fgf',
        description: 'fgd',
        price: '4323',
        image: 'gdf.png',
      }
    }
    tick();
    productService.add(new FormData());

    const req = httpController.expectOne(`${environment.baseApi}products`);

    expect(req.request.method).toEqual('POST');
    req.flush(data);
  }));

  it('should have edit function to ba called', fakeAsync(() => {
    component.productId = 5;
    component.addProductForm?.setValue({
      name: 'fgsdg',
      slug: 'ddg',
      description: 'fdgfdgfd',
      price: 34324,
      image: File
    })
    tick();
    component.add();
  }));

});

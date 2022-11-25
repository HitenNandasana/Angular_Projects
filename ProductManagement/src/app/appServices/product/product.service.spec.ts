import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot(),
      ]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have add function', () => {
    expect(service.add).toBeTruthy();
  });

  it('should have delete function', () => {
    expect(service.delete).toBeTruthy();
  });

  it('should have update function', () => {
    expect(service.update).toBeTruthy();
  });
});

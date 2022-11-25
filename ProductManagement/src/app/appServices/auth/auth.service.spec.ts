import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot()]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have signIn method', () => {
    expect(service.signIn).toBeTruthy();
  });

  it('should have signUp method', () => {
    expect(service.signUp).toBeTruthy();
  });

  it('should have getToken method', () => {
    expect(service.getToken).toBeTruthy();
  });
  
  it('should have setToken method', () => {
    expect(service.setToken).toBeTruthy();
  });
});

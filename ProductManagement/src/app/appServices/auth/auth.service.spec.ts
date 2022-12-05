import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have signIn method', () => {
    let data = new FormData();
    data.append('email', 'gfg@fdg.vdfv');
    data.append('password', '344');

    spyOn(service, 'signIn').and.callThrough();
    service.signIn(data);
  });

  it('should have signUp method', () => {
    let data = new FormData();
    data.append('name', 'eref');
    data.append('first_name', 'dfds');
    data.append('last_name', 'dsf');
    data.append('user_name', 'fsdf');
    data.append('email', 'gfg@fdg.vdfv');
    data.append('password', '344');
    data.append('profile_image', 'fgd.jpg');

    spyOn(service, 'signUp').and.callThrough();
    service.signUp(data);
  });

  it('should have getToken method', () => {
    expect(service.getToken()).toBe(true);
  });

  it('should have not getToken method', () => {
    expect(service.getToken()).toBe(false);
  });

  it('should have setToken method', () => {
    let token = 'dfgdfhsrthsesbsd345634'
    spyOn(service, 'setToken').and.callThrough();
    service.setToken(token);
    expect(service.setToken(token)).not.toBeNull();;
  });
});

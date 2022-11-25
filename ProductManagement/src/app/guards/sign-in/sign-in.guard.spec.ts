import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/appServices/auth/auth.service';

import { SignInGuard } from './sign-in.guard';

describe('SignInGuard', () => {
  let guard: SignInGuard;

  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AuthService,
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    guard = TestBed.inject(SignInGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('be able to hit route when user is logged in', () => {
    expect(authService instanceof (AuthService)).toBeTruthy();
    jasmine.createSpy('getToken').and.returnValue(false);
    expect(guard.canActivate()).toBe(false);
  });

  it('not be able to hit route when user is not logged in', () => {
    expect(authService instanceof (AuthService)).toBeTruthy();
    jasmine.createSpy('getToken').and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });
});

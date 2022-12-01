import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/appServices/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
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
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('be able to hit route when user is logged in', () => {
    // jasmine.createSpy('getToken')?.and.returnValue(true);
    expect(authService.getToken()).toBeTruthy();
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate();
  });

  it('not be able to hit route when user is not logged in', () => {
    // jasmine.createSpy('getToken')?.and.returnValue(false);
    expect(authService.getToken()).toBeFalsy();
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate();
  });
});

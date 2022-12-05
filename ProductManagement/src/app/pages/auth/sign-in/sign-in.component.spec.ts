import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';
import { environment } from 'src/environments/environment';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [AuthService,
        { provide: Router, useValue: router }],
      declarations: [SignInComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    authService = TestBed.inject(AuthService);
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

  it('should onKeydown function to be called', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'onkeydown').and.callThrough();
    component.onkeydown();
    expect(component.loginCheckMessage).toBe(false)
  });

  it('should have signIn function to be called', () => {
    component.signInForm?.setValue({
      email: 'fasf@sfs.dsv',
      password: '32432'
    })
    component.signIn();

    const user = {
      data: {
        user: {
          id: '',
          first_name: '',
          last_name: '',
          user_name: '',
          email: '',
          password: '',
          profile_image: ''
        },
        token: ''
      },
      msg: ''
    }
    authService.signIn(new FormData());

    const req = httpController.expectOne(`${environment.baseApi}login`

    );
    expect(req.request.method).toEqual('POST');
    req.flush(user);



  });

  it('login check error massage', fakeAsync(() => {
    component.signInForm?.setValue({
      email: 'fahtfghrtsyhtrtf@sfstrytr.dsv',
      password: '3243ytry5462'
    })
    component.signIn();

    tick();
    authService.signIn(new FormData());
    const req = httpController.expectOne(`${environment.baseApi}login`);
    const msg = 'Invalid Credential'
    req.flush(msg, { status: 401, statusText: 'Unauthorized' });
  }));

});

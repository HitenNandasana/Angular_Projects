import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';
import { environment } from 'src/environments/environment';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
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
      declarations: [SignUpComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
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
    expect(component.emailCheckMessage).toBe(false)
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

  it('should have signUp function to be called', () => {
    spyOn(component, 'signUp').and.callThrough();
    component.signUp();
    component.signUpForm?.setValue({
      name: 'dfgdg',
      first_name: 'fgfew',
      last_name: 'fgfgdf',
      user_name: 'fdhdfgf4',
      email: 'cvbdfb@dfg.vo',
      password: '45435',
      profile_image: File
    })
    component.signUp();

    const user = {
      data: {
        user: {
          id: '',
          name: '',
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
    authService.signUp(new FormData());

    const req = httpController.expectOne(`${environment.baseApi}register`

    );
    expect(req.request.method).toEqual('POST');
    req.flush(user);

  });
});

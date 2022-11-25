import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AuthService } from '../appServices/auth/auth.service';

import { AppInterceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      AppInterceptor,
      AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AppInterceptor,
        multi: true
      }
    ]
  }));

  const next: any = {
    handle: () => {
      return Observable.create((subscriber: any) => {
        subscriber.complete();
      });
    }
  };

  const requestMock = new HttpRequest('GET', '/test');

  it('should be created', () => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should be created', fakeAsync(() => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    tick();
    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(interceptor.authRequest).toBe(true);
    });
  }));

});

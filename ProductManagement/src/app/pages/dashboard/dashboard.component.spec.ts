import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot()],
      providers: [
        { provide: Router, useValue: router }
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   let store: any = {};
  //   const mockLocalStorage = {
  //     removeItem: (key: string) => {
  //       delete store[key];
  //     },
  //   };
  //   spyOn(localStorage, 'removeItem')
  //     .and.callFake(mockLocalStorage.removeItem);


  //   const localStorageRefServiceSpy = jasmine.createSpyObj('LocalStorageRef', ['getLocalStorage']);
  //   const getLocalStorageSpy = jasmine.createSpyObj('LocalStorageRef.getLocalStorage', ['getItem', 'setItem', 'removeItem']);
  //   localStorageRefServiceSpy.getLocalStorage.and.returnValue(getLocalStorageSpy);
  //   getLocalStorageSpy.removeItem.and.callFake(mockLocalStorage.removeItem);
  // });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have signOut method', () => {
    expect(component.signout).toBeTruthy();
    // expect(mockLocalStorage.removeItem('Token')).toBeUndefined();
  });
});

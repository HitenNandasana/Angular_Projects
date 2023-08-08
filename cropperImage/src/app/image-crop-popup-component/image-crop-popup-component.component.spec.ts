import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropPopupComponentComponent } from './image-crop-popup-component.component';

describe('ImageCropPopupComponentComponent', () => {
  let component: ImageCropPopupComponentComponent;
  let fixture: ComponentFixture<ImageCropPopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCropPopupComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCropPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

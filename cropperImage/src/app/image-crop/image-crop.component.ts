import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';


@Component({
  selector: 'image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit, AfterViewInit {

  @ViewChild("image", { static: false })
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: any;

  public imageDestination: string;
  private cropper: Cropper;
  CroppedImage: string;

  cropImage = false;
  image: any;

  constructor() {
    this.CroppedImage = "";
  }

  ngAfterViewInit() {
    // console.log(this.imageElement.nativeElement);
    // console.log(typeof this.imageSource);
    // console.log(this.imageSource);
    // this.cropper = new Cropper(this.imageElement.nativeElement, {
    //   // scalable: true,
    //   // movable: false,
    //   viewMode: 1,
    //   dragMode: 'move',
    //   aspectRatio: 1,
    //   checkOrientation: false,
    //   cropBoxMovable: false,
    //   cropBoxResizable: false,
    //   zoomOnTouch: true,
    //   zoomOnWheel: true,
    //   guides: false,
    //   highlight: false,
    //   crop: () => {
    //     const canvas = this.cropper.getCroppedCanvas();
    //     this.imageDestination = canvas.toDataURL("image/png");
    //   }
    // });
  }

  ngOnInit() {
    // debugger
    // console.log(this.imageElement.nativeElement);
    // console.log(typeof this.imageSource);
    // console.log(this.imageSource);
    // this.cropper = new Cropper(this.imageElement.nativeElement, {
    //   // scalable: true,
    //   // movable: false,
    //   viewMode: 1,
    //   dragMode: 'move',
    //   aspectRatio: 1,
    //   checkOrientation: false,
    //   cropBoxMovable: false,
    //   cropBoxResizable: false,
    //   zoomOnTouch: true,
    //   zoomOnWheel: true,
    //   guides: false,
    //   highlight: false,
    //   crop: () => {
    //     const canvas = this.cropper.getCroppedCanvas();
    //     this.imageDestination = canvas.toDataURL("image/png");
    //   }
    // });

    setTimeout(() => {
      this.init()
    }, 1000);
  }

  imageSelect(event: any) {
    const input = event.target as HTMLInputElement;
    // if (input.files[0]) {
    //   const imageFile = input.files[0];
    //   const fileReader = new FileReader();
    //   fileReader.onload = () => {
    //     const srcdata = fileReader.result
    //     this.imageSource = srcdata
    //   }
    //   fileReader.readAsDataURL(imageFile);
    //   this.init();


    // const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.imageSource = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSource = reader.result
    };
    reader.readAsDataURL(this.imageSource);
  }


  init() {
    setTimeout(() => {
      this.image = document.getElementById('image')
      this.cropper = new Cropper(this.image, {
        // scalable: true,
        // movable: false,
        viewMode: 0,
        dragMode: 'move',
        aspectRatio: 10 / 7,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL("image/png");
        }
      });
    }, 1000);
  }

  cropImg() {
    this.cropImage = true;
    // let res = $('#result');
    // let res = document.getElementById('result');
    this.CroppedImage = this.imageDestination;
  }
}

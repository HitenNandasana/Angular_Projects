import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// import * as Cropper from 'cropperjs';
import Cropper from 'cropperjs';
// const Cropper = require('js-cropper');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cropperImage';
  srcdata: any;

  constructor() {
  }

  imageSelect(event: any) {
    // debugger
    // if (event.target.files[0]) {
    //   // const imageFile = event.target.files;
    //   // const fileReader = new FileReader();
    //   // fileReader.onload = () => {
    //   //   this.srcdata = fileReader.result;
    //   // }
    //   // // fileReader.readAsDataURL(imageFile)
    //   // console.log(fileReader);

    //   const selectedfile = event.target.files;
    //   if (selectedfile.length > 0) {
    //     const [imageFile] = selectedfile;
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => {
    //       const srcData = fileReader.result;
    //       console.log('base64:', srcData)
    //       this.srcdata = srcData;
    //     };
    //     fileReader.readAsDataURL(imageFile);
    //   }

    //   console.log(typeof this.srcdata);
    //   console.log(this.srcdata);
    // }
  }

  cropImage(event: any) {
    // const Cropper = require('cropperjs');
    // const cropper = new Cropper();
    // const cropper = new Cropper({
    //   width: 560,
    //   height: 340,
    //   onInit: function (crop: any) { },
    //   onChange: function (crop: any) { }
    // });
    // const cropper = new Cropper(event, {
    //   aspectRatio: 16 / 9,
    //   crop(event: any) {
    //     console.log(event);
    //   },
    // });

    // cropper.render("#crop");

    // let img = new Image();
    // var objectUrl = URL.createObjectURL(event.target.files[0]);
    // img.src = objectUrl;
    // cropper.loadImage(objectUrl).then(function (crop: any) {
    //   console.info("Image is ready to crop.");
    //   img.src = objectUrl;

    // });

    // cropper.getCroppedImage();


  }


  // openDialogCropImage(event: any, type: any) {
  //   // if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/PNG' || event.target.files[0].type == 'image/JPEG' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/JPG') {
  //   let imageCropPopup = this.dialog.open(ImageCropPopupComponentComponent, {
  //     width: '550px',
  //     panelClass: 'add_project_cdk_wfh',
  //     disableClose: true,
  //     autoFocus: false,
  //     data: { type: type, file: event }
  //   })
  //   imageCropPopup.afterClosed().subscribe((res: any) => {
  //     if (res.res == 1) {
  //       if (type == 2) {
  //         // this.uploadProfile(res.file);
  //         // this.profilePersonalInfoForm.patchValue({ profile_image: res.file })
  //       }
  //     }
  //   })
  //   // }
  //   // else {
  //   // this.fileTypeError = 'Only .jpg,.jpeg or .png file type is allowed'
  //   // }
  // }

}



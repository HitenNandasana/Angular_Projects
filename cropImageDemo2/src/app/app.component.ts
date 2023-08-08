import { Component } from '@angular/core';
// let Crop = require('tinycrop')
// import jsCrop from '../../node_modules/js-crop/js-crop.js'
let jsCrop = require('js-crop');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cropImageDemo2';

  ngOnInit() {
    // let crop = Crop.create({
    //   parent: '#mount',
    //   image: 'images/portrait.jpg',
    //   bounds: {
    //     width: '100%',
    //     height: '50%'
    //   },
    //   backgroundColors: ['#fff', '#f3f3f3'],
    //   selection: {
    //     color: 'red',
    //     activeColor: 'blue',
    //     aspectRatio: 4 / 3,
    //     minWidth: 200,
    //     minHeight: 300,
    //     width: 400,
    //     height: 500,
    //     x: 100,
    //     y: 500
    //   },
    //   onInit: () => { console.log('Initialised') }

    // });

    // (document as any).getElementById("imageToCrop").addEventListener("load", function () {
    //   jsCrop.initialise(this);
    // });

    let canvasElement = document.getElementById('crop-result');

    let cropper = jsCrop.initialise(document.getElementById("imageToCrop"), {
      "outputCanvas": document.getElementById("crop-result"),
      // "startInCropMode": false
    });

    cropper.downloadCroppedImage();

    cropper.setCropRegion(10, 10, 150, 250);

    cropper.setOutputCanvas(canvasElement);

    cropper.drawCroppedImage();


    // window.onload = function () {

    //   const img: any   = document.getElementById("flower");

    //   const canvas = <HTMLCanvasElement> document.getElementById("can_id");

    //   const context = canvas ? canvas.getContext("2d") : '';

    //   context ? context.drawImage(img, 1, 1) : '';

    // };
  }
}

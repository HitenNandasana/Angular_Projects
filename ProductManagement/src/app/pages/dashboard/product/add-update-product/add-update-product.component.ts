import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/appServices/product/product.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  addProductForm: FormBuilder | any;
  submit = false;
  fileHolder: File | undefined;
  ediProductObj: any
  productId: any;
  imgNm: any


  constructor(private fb: FormBuilder,
    public location: Location,
    private productservice: ProductService,
    private toastr: ToastrService,
    private avticeroute: ActivatedRoute) {

    this.productservice.ediProductObj.subscribe(res => {
      this.ediProductObj = res;
      this.imgNm = this.ediProductObj.imgName;
    });
    this.avticeroute.paramMap.subscribe(param => {
      this.productId = param.get('id');
    })
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      'name': [this.productId ? this.ediProductObj.name : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'slug': [{ value: this.productId ? this.ediProductObj.slug : '', disabled: this.productId ? true : false }, [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'description': [{ value: this.productId ? this.ediProductObj.description : '', disabled: this.productId ? true : false }, [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'price': [{ value: this.productId ? Number(this.ediProductObj.price) : '', disabled: this.productId ? true : false }, [Validators.required, Validators.pattern("[1-9].*")]],
      'image': [{ value: '', disabled: this.productId ? true : false }, Validators.required]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
    }
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  add() {
    this.submit = true;
    if (this.addProductForm.valid) {
      if (!this.productId && this.fileHolder && this.fileHolder.name) {
        const formData = new FormData();

        formData.append('name', this.addProductForm.value.name);
        formData.append('slug', this.addProductForm.value.slug);
        formData.append('description', this.addProductForm.value.description);
        formData.append('price', this.addProductForm.value.price);
        formData.append('image', this.fileHolder, this.fileHolder.name);


        this.productservice.add(formData, this.fileHolder.name);
      } else if (this.productId) {
        const formData = new FormData();

        formData.append('id', this.ediProductObj.id);
        formData.append('name', this.addProductForm.value.name);

        this.productservice.update(formData);
      }
      this.submit = false;
    }
  }
}

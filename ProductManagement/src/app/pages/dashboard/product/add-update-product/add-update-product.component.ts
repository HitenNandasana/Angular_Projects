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
    private route: Router,
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
      'description': [{ value: this.productId ? this.ediProductObj.description : '', disabled: this.productId ? true : false }, [Validators.required, Validators.pattern("^[a-zA-Z0-9].*")]],
      'price': [{ value: this.productId ? Number(this.ediProductObj.price) : '', disabled: this.productId ? true : false }, [Validators.required, Validators.pattern("[1-9].*")]],
      'image': [{ value: '', disabled: this.productId ? true : false }, Validators.required]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      this.addProductForm.get('image').setValue(this.fileHolder);
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
      if (!this.productId && this.addProductForm.value.image) {
        const formData = new FormData();

        formData.append('name', this.addProductForm.value.name);
        formData.append('slug', this.addProductForm.value.slug);
        formData.append('description', this.addProductForm.value.description);
        formData.append('price', this.addProductForm.value.price);
        formData.append('image', this.addProductForm.value.image);


        this.productservice.add(formData).subscribe(res => {
          console.log(res);
          let dataList = this.productservice.getProductData();
          let object = res.data;
          object.imgName = this.addProductForm.value.image;
          dataList.push(object);
          this.productservice.setProductData(dataList);
          this.route.navigate(['dashboard/product']);
          this.toastr.success('Product added successfully');
        });
      } else {
        const formData = new FormData();

        formData.append('id', this.ediProductObj.id);
        formData.append('name', this.addProductForm.value.name);

        this.productservice.update(formData).subscribe(res => {
          console.log(res);
          let dataList = this.productservice.getProductData();
          let arr = dataList.map((obj: any) => {
            if (obj.id === Number(formData.get('id'))) {
              let object = res.data;
              object.imgName = obj.imgName;
              return object;
            }
            return obj;
          })
          this.productservice.setProductData(arr);
          this.route.navigate(['dashboard/product']);
          this.toastr.success('Product updated successfully');
        });
        this.ediProductObj.next('');
      }
      this.submit = false;
    }
  }
}

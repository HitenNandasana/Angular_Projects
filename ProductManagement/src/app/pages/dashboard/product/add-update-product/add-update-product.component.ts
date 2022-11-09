import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private fb: FormBuilder,
    public location: Location,
    private productservice: ProductService,
    private route: Router) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      'name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'slug': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'description': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'price': ['', [Validators.required]],
      'image': ['', [Validators.required]]
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
    if (this.addProductForm.valid && this.fileHolder && this.fileHolder.name) {
      const formData = new FormData();

      formData.append('name', this.addProductForm.value.name);
      formData.append('slug', this.addProductForm.value.slug);
      formData.append('description', this.addProductForm.value.description);
      formData.append('price', this.addProductForm.value.price);
      formData.append('image', this.fileHolder, this.fileHolder.name);

      this.productservice.add(formData).subscribe(res => {
        console.log(res);
      })
      this.route.navigate(['dashboard/product']);
      this.submit = false;
    }
  }
}

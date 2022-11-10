import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/appServices/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: any;
  productObj: any = '';

  constructor(private route: Router,
    private productService: ProductService,
    private toastr: ToastrService) {

    if (localStorage.getItem('Product') === null || localStorage.getItem('Product') == undefined) {
      let productList: any = [];

      this.productService.setProductData(productList);
      return;
    }
    this.productList = this.productService.getProductData();
  }

  ngOnInit(): void {
  }

  view(obj: any) {
    this.productObj = obj;
  }

  addProduct() {
    this.route.navigate(['dashboard/product/add']);
  }

  deleteProduct(index: any, data: any) {
    if (confirm('Do you rellay want to delete this?')) {
      this.productService.delete(index, data);
      this.productList = this.productService.getProductData();
      this.toastr.success('Product deleted successfully');
    }
  }

}

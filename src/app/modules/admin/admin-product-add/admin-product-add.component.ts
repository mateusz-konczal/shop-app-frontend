import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminProductAddService } from './admin-product-add.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent {

  productForm!: FormGroup;

  constructor(
    private router: Router,
    private adminProductAddService: AdminProductAddService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    });
  }

  submit() {
    this.adminProductAddService
      .saveNewProduct(this.productForm.value)
      .subscribe(product => {
        this.router.navigate(["/admin/products/update", product.id])
          .then(() => this.snackBar.open("Produkt został dodany", '', { duration: 3000 }));
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminMessageService } from '../../admin-message.service';
import { AdminCategoryService } from '../admin-category.service';
import { AdminCategory } from '../model/adminCategory';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.scss']
})
export class AdminCategoryAddComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private router: Router,
    private adminCategoryService: AdminCategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      slug: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.adminCategoryService
    .saveNewCategory(this.categoryForm.value as AdminCategory)
    .subscribe({
      next: category => {
        this.router.navigate(["/admin/categories"])
        .then(() => this.snackBar.open("Kategoria została dodana", '', { duration: 3000 }));
      },
      error: err => this.adminMessageService.addSpringErrors(err.error)
    });
  }
}

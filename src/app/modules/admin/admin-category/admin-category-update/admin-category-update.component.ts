import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminMessageService } from '../../admin-message.service';
import { AdminCategoryService } from '../admin-category.service';
import { AdminCategory } from '../model/adminCategory';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss']
})
export class AdminCategoryUpdateComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
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

    this.getCategory();
  }

  getCategory() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCategoryService
      .getCategory(id)
      .subscribe(category => this.mapToFormValues(category));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCategoryService
      .saveCategory(id, this.categoryForm.value as AdminCategory)
      .subscribe({
        next: category => {
          this.mapToFormValues(category);
          this.snackBar.open("Kategoria została zaktualizowana", '', { duration: 3000 });
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }

  private mapToFormValues(category: AdminCategory): void {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
  }
}

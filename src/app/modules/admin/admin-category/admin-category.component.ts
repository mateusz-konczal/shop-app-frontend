import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminCategoryName } from '../common/dto/adminCategoryName';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminInfoDialogService } from '../common/service/admin-info-dialog.service';
import { AdminCategoryService } from './admin-category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "name", "actions"];
  dataSource: Array<AdminCategoryName> = [];

  constructor(
    private adminCategoryService: AdminCategoryService,
    private confirmDialogService: AdminConfirmDialogService,
    private infoDialogService: AdminInfoDialogService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.adminCategoryService.getCategories()
      .subscribe(categories => this.dataSource = categories);
  }

  confirmDelete(element: AdminCategoryName) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć tę kategorię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminCategoryService.deleteCategory(element.id)
            .subscribe({
              next: () => {
                this.dataSource.forEach((value, index) => {
                  if (element == value) {
                    this.dataSource.splice(index, 1);
                    this.table.renderRows();
                  }
                });
              },
              error: () => this.infoDialogService.openInfoDialog("Nie możesz usunąć kategorii zawierającej produkty.")
            });
        }
      });
  }
}

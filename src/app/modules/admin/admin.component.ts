import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminProduct } from './common/model/adminProduct';
import { AdminService } from './admin.service';
import { AdminConfirmDialogService } from './common/service/admin-confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["image", "id", "name", "price", "actions"];
  dataSource: AdminProduct[] = [];
  totalElements: number = 0;

  constructor(
    private adminService: AdminService,
    private dialogService: AdminConfirmDialogService,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminService.getSaleProducts(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    });
  }

  confirmDelete(element: AdminProduct) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten produkt?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminService.deleteSaleProduct(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  this.dataSource.splice(index, 1);
                  this.table.renderRows();
                  this.totalElements--;
                }
              });
            });
        }
      });
  }

  clearAllCaches() {
    this.adminService.clearAllCaches()
      .subscribe(() => this.snackBar.open("Pamięć podręczna została wyczyszczona", '', { duration: 3000 }));
  }
}

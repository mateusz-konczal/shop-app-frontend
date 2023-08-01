import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap } from 'rxjs';
import { AdminService } from './admin.service';
import { AdminProduct } from './common/model/adminProduct';
import { AdminConfirmDialogService } from './common/service/admin-confirm-dialog.service';
import { AdminInfoDialogService } from './common/service/admin-info-dialog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["image", "id", "name", "price", "enabled", "actions"];
  dataSource: AdminProduct[] = [];
  totalElements: number = 0;
  private options = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminService: AdminService,
    private confirmDialogService: AdminConfirmDialogService,
    private infoDialogService: AdminInfoDialogService,
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

  clearAllCaches() {
    this.adminService.clearAllCaches()
      .subscribe(() => this.snackBar.open("Pamięć podręczna została wyczyszczona", '', { duration: 3000 }));
  }

  confirmDelete(element: AdminProduct) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten produkt?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminService.deleteProduct(element.id)
            .subscribe({
              next: () => {
                this.dataSource.forEach((value, index) => {
                  if (element == value) {
                    this.dataSource.splice(index, 1);
                    this.table.renderRows();
                    this.totalElements--;
                  }
                });
              },
              error: () => this.infoDialogService.openInfoDialog("Nie możesz usunąć tego produktu, " +
                "ponieważ został on już zawarty w co najmniej jednym zamówieniu. Jeśli chcesz wyłączyć " +
                "ten produkt ze sprzedaży, kliknij ikonę krzyżyka znajdującą się w akcjach.")
            });
        }
      });
  }

  confirmEnablingProduct(element: AdminProduct) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz włączyć ten produkt do sprzedaży?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminService.enableProduct(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  element.enabled = true;
                }
              });
            });
        }
      });
  }

  confirmDisablingProduct(element: AdminProduct) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz wyłączyć ten produkt ze sprzedaży?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminService.disableProduct(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  element.enabled = false;
                }
              });
            });
        }
      });
  }

  getOption(option: boolean) {
    return this.options.get(option);
  }
}

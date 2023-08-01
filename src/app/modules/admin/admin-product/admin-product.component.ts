import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap } from 'rxjs';
import { AdminProduct } from '../common/model/adminProduct';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminInfoDialogService } from '../common/service/admin-info-dialog.service';
import { AdminProductService } from './admin-product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

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
    private adminProductService: AdminProductService,
    private confirmDialogService: AdminConfirmDialogService,
    private infoDialogService: AdminInfoDialogService
  ) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    });
  }

  confirmDelete(element: AdminProduct) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten produkt?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminProductService.deleteProduct(element.id)
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
          this.adminProductService.enableProduct(element.id)
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
          this.adminProductService.disableProduct(element.id)
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

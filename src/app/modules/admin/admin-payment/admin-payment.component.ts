import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminPayment } from '../common/model/adminPayment';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminInfoDialogService } from '../common/service/admin-info-dialog.service';
import { AdminPaymentService } from './admin-payment.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss']
})
export class AdminPaymentComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "name", "type", "defaultPayment", "enabled", "note", "actions"];
  dataSource: Array<AdminPayment> = [];
  private options = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminPaymentService: AdminPaymentService,
    private confirmDialogService: AdminConfirmDialogService,
    private infoDialogService: AdminInfoDialogService
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.adminPaymentService.getPayments()
      .subscribe(payments => this.dataSource = payments);
  }

  confirmDelete(element: AdminPayment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten sposób płatności?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminPaymentService.deletePayment(element.id)
            .subscribe({
              next: () => {
                this.dataSource.forEach((value, index) => {
                  if (element == value) {
                    this.dataSource.splice(index, 1);
                    this.table.renderRows();
                  }
                });
              },
              error: () => this.infoDialogService.openInfoDialog("Nie możesz usunąć tego sposobu płatności, " +
                "ponieważ został on już użyty przez co najmniej jednego klienta sklepu. Jeśli chcesz wyłączyć " +
                "tę formę płatności, kliknij ikonę krzyżyka znajdującą się w akcjach.")
            });
        }
      });
  }

  confirmEnablingPayment(element: AdminPayment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz włączyć ten sposób płatności?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminPaymentService.enablePayment(element.id)
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

  confirmDisablingPayment(element: AdminPayment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz wyłączyć ten sposób płatności?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminPaymentService.disablePayment(element.id)
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

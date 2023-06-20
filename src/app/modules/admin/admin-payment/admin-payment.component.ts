import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminPayment } from '../common/model/adminPayment';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminPaymentService } from './admin-payment.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss']
})
export class AdminPaymentComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "name", "type", "defaultPayment", "note", "actions"];
  dataSource: Array<AdminPayment> = [];
  private options = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminPaymentService: AdminPaymentService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.adminPaymentService.getPayments()
      .subscribe(payments => this.dataSource = payments);
  }

  confirmDelete(element: AdminPayment) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten sposób płatności?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminPaymentService.deletePayment(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  this.dataSource.splice(index, 1);
                  this.table.renderRows();
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

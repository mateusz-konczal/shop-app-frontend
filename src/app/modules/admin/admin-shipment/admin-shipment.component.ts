import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminShipment } from '../common/model/adminShipment';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminInfoDialogService } from '../common/service/admin-info-dialog.service';
import { AdminShipmentService } from './admin-shipment.service';

@Component({
  selector: 'app-admin-shipment',
  templateUrl: './admin-shipment.component.html',
  styleUrls: ['./admin-shipment.component.scss']
})
export class AdminShipmentComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "name", "price", "type", "defaultShipment", "enabled", "actions"];
  dataSource: Array<AdminShipment> = [];
  private options = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminShipmentService: AdminShipmentService,
    private confirmDialogService: AdminConfirmDialogService,
    private infoDialogService: AdminInfoDialogService
  ) { }

  ngOnInit(): void {
    this.getShipments();
  }

  getShipments() {
    this.adminShipmentService.getShipments()
      .subscribe(shipments => this.dataSource = shipments);
  }

  confirmDelete(element: AdminShipment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten sposób dostawy?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminShipmentService.deleteShipment(element.id)
            .subscribe({
              next: () => {
                this.dataSource.forEach((value, index) => {
                  if (element == value) {
                    this.dataSource.splice(index, 1);
                    this.table.renderRows();
                  }
                });
              },
              error: () => this.infoDialogService.openInfoDialog("Nie możesz usunąć tego sposobu dostawy, " +
                "ponieważ został on już użyty przez co najmniej jednego klienta sklepu. Jeśli chcesz wyłączyć " +
                "tę formę dostawy, kliknij ikonę krzyżyka znajdującą się w akcjach.")
            });
        }
      });
  }

  confirmEnablingShipment(element: AdminShipment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz włączyć ten sposób dostawy?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminShipmentService.enableShipment(element.id)
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

  confirmDisablingShipment(element: AdminShipment) {
    this.confirmDialogService.openConfirmDialog("Czy na pewno chcesz wyłączyć ten sposób dostawy?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminShipmentService.disableShipment(element.id)
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

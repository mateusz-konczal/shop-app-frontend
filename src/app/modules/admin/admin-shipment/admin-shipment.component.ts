import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminShipment } from '../common/model/adminShipment';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminShipmentService } from './admin-shipment.service';

@Component({
  selector: 'app-admin-shipment',
  templateUrl: './admin-shipment.component.html',
  styleUrls: ['./admin-shipment.component.scss']
})
export class AdminShipmentComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "name", "price", "type", "defaultShipment", "actions"];
  dataSource: Array<AdminShipment> = [];
  private options = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminShipmentService: AdminShipmentService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.getShipments();
  }

  getShipments() {
    this.adminShipmentService.getShipments()
      .subscribe(shipments => this.dataSource = shipments);
  }

  confirmDelete(element: AdminShipment) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten sposób dostawy?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminShipmentService.deleteShipment(element.id)
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

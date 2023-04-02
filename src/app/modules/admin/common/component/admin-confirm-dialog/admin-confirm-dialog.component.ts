import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-confirm-dialog',
  templateUrl: './admin-confirm-dialog.component.html',
  styleUrls: ['./admin-confirm-dialog.component.scss']
})
export class AdminConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

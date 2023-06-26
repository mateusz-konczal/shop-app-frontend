import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-info-dialog',
  templateUrl: './admin-info-dialog.component.html',
  styleUrls: ['./admin-info-dialog.component.scss']
})
export class AdminInfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

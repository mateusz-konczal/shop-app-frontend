import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminInfoDialogComponent } from '../component/admin-info-dialog/admin-info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoDialogService {

  constructor(private dialog: MatDialog) { }

  openInfoDialog(message: string): MatDialogRef<AdminInfoDialogComponent, Boolean> {
    return this.dialog.open(AdminInfoDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }
}

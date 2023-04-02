import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminConfirmDialogComponent } from '../component/admin-confirm-dialog/admin-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string): MatDialogRef<AdminConfirmDialogComponent, Boolean> {
    return this.dialog.open(AdminConfirmDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }
}

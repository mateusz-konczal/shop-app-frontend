import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string): MatDialogRef<ConfirmDialogComponent, Boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }
}

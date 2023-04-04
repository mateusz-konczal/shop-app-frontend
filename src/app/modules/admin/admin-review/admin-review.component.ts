import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminReview } from './model/adminReview';
import { AdminReviewService } from './admin-review.service';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["id", "authorName", "content", "moderated", "actions"];
  dataSource: AdminReview[] = [];
  totalElements: number = 0;

  constructor(
    private adminReviewService: AdminReviewService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminReviewService.getReviews(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    });
  }

  confirmModerate(element: AdminReview) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz zatwierdzić tę opinię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminReviewService.moderateReview(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  element.moderated = true;
                }
              });
            });
        }
      });
  }

  confirmDelete(element: AdminReview) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć tę opinię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminReviewService.deleteReview(element.id)
            .subscribe(() => {
              this.dataSource.forEach((value, index) => {
                if (element == value) {
                  this.dataSource.splice(index, 1);
                  this.table.renderRows();
                  this.totalElements--;
                }
              });
            });
        }
      });
  }
}

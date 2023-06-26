import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminUserService } from './admin-user.service';
import { AdminUserReadDto } from './model/adminUserReadDto';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["id", "username", "userRoles", "enabled", "actions"];
  dataSource: Array<AdminUserReadDto> = [];
  totalElements: number = 0;
  roles!: Map<string, string>;
  private statuses = new Map<boolean, string>([
    [true, "tak"],
    [false, "nie"],
  ]);

  constructor(
    private adminUserService: AdminUserService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngAfterViewInit(): void {
    this.getUserRoles();
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminUserService.getUsers(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    });
  }

  getUserRoles() {
    this.adminUserService.getUserRoles()
      .subscribe(data => this.roles = new Map(Object.entries(data.userRoles)));
  }

  confirmEnablingUser(element: AdminUserReadDto) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz włączyć tego użytkownika?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminUserService.enableUser(element.id)
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

  confirmDisablingUser(element: AdminUserReadDto) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz wyłączyć tego użytkownika?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminUserService.disableUser(element.id)
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

  getRole(role: string) {
    return this.roles.get(role);
  }

  getStatus(status: boolean) {
    return this.statuses.get(status);
  }
}

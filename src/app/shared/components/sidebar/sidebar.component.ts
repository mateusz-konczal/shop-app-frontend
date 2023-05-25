import { Component, OnInit } from '@angular/core';
import { SidebarCategory } from './model/sidebarCategory';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Array<SidebarCategory> = [];

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sidebarService.getCategories()
      .subscribe(categories =>
        this.categories = categories.sort((el1, el2) => (el1.name < el2.name ? -1 : 1)));
  }
}

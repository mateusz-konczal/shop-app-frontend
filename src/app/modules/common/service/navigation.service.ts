import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly PROFILE_URL = "/profile";
  private previousUrl: string | undefined;

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof RoutesRecognized),
      map(event => event as RoutesRecognized),
      filter(event => event.url.startsWith("/lostPassword") ? false : true),
      pairwise()
    ).subscribe((events: RoutesRecognized[]) => {
      if (events[0].urlAfterRedirects === events[1].urlAfterRedirects) {
        this.previousUrl = undefined;
      } else {
        this.previousUrl = events[0].urlAfterRedirects;
      }
    });
  }

  back(): void {
    if (this.previousUrl !== undefined) {
      this.location.back();
    } else {
      this.router.navigate([this.PROFILE_URL]);
    }
  }
}

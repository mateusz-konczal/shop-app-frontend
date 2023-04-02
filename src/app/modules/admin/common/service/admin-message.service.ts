import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>();

  constructor() { }

  // Handling common error messages
  add(message: string): void {
    this.clear();
    this.messages.push(message);
    this.subject.next(this.messages);
  }

  // Spring error handling
  addSpringErrors(error: any): void {
    this.clear();
    this.extractMessages(error);
    this.subject.next(this.messages);
  }

  clear() {
    this.messages = [];
  }

  private extractMessages(error: any) {
    if (error.errors?.length > 0) {
      for (let message of error.errors) {
        this.messages.push("Pole: " + message.field + " -> " + message.defaultMessage);
      }
    } else {
      this.messages.push(error.message);
    }
  }
}

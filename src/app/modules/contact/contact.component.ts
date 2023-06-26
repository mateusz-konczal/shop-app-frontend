import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './model/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact!: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.contactService.getContact()
      .subscribe(contact => this.contact = contact);
  }
}

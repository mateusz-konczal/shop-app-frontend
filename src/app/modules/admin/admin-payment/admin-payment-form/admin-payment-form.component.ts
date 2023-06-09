import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminPaymentService } from "../admin-payment.service";

@Component({
    selector: 'app-admin-payment-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Nazwa</mat-label>
            <input type="text" matInput placeholder="Podaj nazwę płatności" formControlName="name">
            <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="errorMessages">
                <div *ngIf="name?.errors?.['required']">
                    Nazwa jest wymagana
                </div>
                <div *ngIf="name?.errors?.['minlength']">
                    Nazwa musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Typ</mat-label>
            <mat-select formControlName="type">
                <mat-option *ngFor="let type of types" [value]="type">
                    {{type}}
                </mat-option>
            </mat-select>
            <div *ngIf="type?.invalid && (type?.dirty || type?.touched)" class="errorMessages">
                <div *ngIf="type?.errors?.['required']">
                    Typ jest wymagany
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Czy jest to domyślny sposób płatności?</mat-label>
            <mat-select formControlName="defaultPayment">
                <mat-option value="false">NIE</mat-option>
                <mat-option value="true">TAK</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Czy aktywować ten sposób płatności?</mat-label>
            <mat-select formControlName="enabled">
                <mat-option value="true">TAK</mat-option>
                <mat-option value="false">NIE</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Notatka</mat-label>
            <textarea matInput rows="10" placeholder="Podaj notatkę do tego sposobu płatności" formControlName="note"></textarea>
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Zapisz</button>
        </div>
    </div>`,
    styles: [`
    .errorMessages {
        color: red;
    }`]
})

export class AdminPaymentFormComponent {

    @Input() parentForm!: FormGroup;
    types: Array<string> = [];

    constructor(private adminPaymentService: AdminPaymentService) { }

    ngOnInit(): void {
        this.getPaymentTypes();
    }

    getPaymentTypes() {
        this.adminPaymentService.getPaymentTypes()
            .subscribe(types => this.types = types);
    }

    get name() {
        return this.parentForm.get("name");
    }

    get type() {
        return this.parentForm.get("type");
    }
}

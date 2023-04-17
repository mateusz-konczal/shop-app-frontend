import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminShipmentType } from "../model/adminShipmentType";

@Component({
    selector: 'app-admin-shipment-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Nazwa</mat-label>
            <input type="text" matInput placeholder="Podaj nazwę dostawcy" formControlName="name">
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
            <mat-label>Cena</mat-label>
            <input type="number" min="0" matInput placeholder="Podaj cenę usługi" formControlName="price">
            <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="errorMessages">
                <div *ngIf="price?.errors?.['required']">
                    Cena jest wymagana
                </div>
                <div *ngIf="price?.errors?.['min']">
                    Cena musi być większa od zera
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
            <mat-label>Domyślny dostawca</mat-label>
            <mat-select formControlName="defaultShipment">
                <mat-option value="false">NIE</mat-option>
                <mat-option value="true">TAK</mat-option>
            </mat-select>
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
export class AdminShipmentFormComponent {

    @Input() parentForm!: FormGroup;
    types: Array<string> = Object.keys(AdminShipmentType).filter(type => isNaN(Number(type)));

    get name() {
        return this.parentForm.get("name");
    }

    get price() {
        return this.parentForm.get("price");
    }

    get type() {
        return this.parentForm.get("type");
    }

    get defaultShipment() {
        return this.parentForm.get("defaultShipment");
    }
}

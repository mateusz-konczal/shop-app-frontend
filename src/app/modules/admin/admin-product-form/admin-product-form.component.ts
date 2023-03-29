import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-admin-product-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Nazwa</mat-label>
            <input type="text" matInput placeholder="Podaj nazwę produktu" formControlName="name">
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
            <mat-label>Przyjazny URL</mat-label>
            <input type="text" matInput placeholder="Podaj URL" formControlName="slug">
            <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="errorMessages">
                <div *ngIf="slug?.errors?.['required']">
                    URL jest wymagany
                </div>
                <div *ngIf="slug?.errors?.['minlength']">
                    URL musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Opis</mat-label>
            <textarea matInput rows="10" placeholder="Podaj opis produktu" formControlName="description"></textarea>
            <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="errorMessages">
                <div *ngIf="description?.errors?.['required']">
                    Opis jest wymagany
                </div>
                <div *ngIf="description?.errors?.['minlength']">
                    Opis musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Kategoria</mat-label>
            <input type="text" matInput placeholder="Podaj kategorię produktu" formControlName="category">
            <div *ngIf="category?.invalid && (category?.dirty || category?.touched)" class="errorMessages">
                <div *ngIf="category?.errors?.['required']">
                    Kategoria jest wymagana
                </div>
                <div *ngIf="category?.errors?.['minlength']">
                    Kategoria musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Cena</mat-label>
            <input type="number" matInput placeholder="Podaj cenę produktu" formControlName="price">
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
            <mat-label>Waluta</mat-label>
            <input type="text" matInput placeholder="Podaj walutę" formControlName="currency">
            <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="errorMessages">
                <div *ngIf="currency?.errors?.['required']">
                    Waluta jest wymagana
                </div>
            </div>
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
export class AdminProductFormComponent {

    @Input() parentForm!: FormGroup;

    get name() {
        return this.parentForm.get("name");
    }

    get description() {
        return this.parentForm.get("description");
    }

    get category() {
        return this.parentForm.get("category");
    }

    get price() {
        return this.parentForm.get("price");
    }

    get currency() {
        return this.parentForm.get("currency");
    }

    get slug() {
        return this.parentForm.get("slug");
    }
}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-admin-product-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Nazwa</mat-label>
            <input matInput placeholder="Podaj nazwę produktu" formControlName="name">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Opis</mat-label>
            <textarea matInput rows="10" placeholder="Podaj opis produktu" formControlName="description"></textarea>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Kategoria</mat-label>
            <input matInput placeholder="Podaj kategorię produktu" formControlName="category">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Cena</mat-label>
            <input matInput placeholder="Podaj cenę produktu" formControlName="price">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Waluta</mat-label>
            <input matInput placeholder="Podaj walutę" formControlName="currency">
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary">Zapisz</button>
        </div>
    </div>`
})
export class AdminProductFormComponent {

    @Input() parentForm!: FormGroup;

}
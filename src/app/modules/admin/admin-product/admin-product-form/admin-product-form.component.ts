import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminCategoryName } from '../../common/dto/adminCategoryName';
import { AdminFormCategoryService } from './admin-form-category.service';
import { FormProductCurrencyService } from './form-product-currency.service';

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
            <mat-label>Pełny opis</mat-label>
            <textarea matInput rows="30" placeholder="Podaj pełny opis produktu" formControlName="fullDescription"></textarea>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Kategoria</mat-label>
            <mat-select formControlName="categoryId">
                <mat-option *ngFor="let category of categories" [value]="category.id">
                    {{category.name}}
                </mat-option>
            </mat-select>
            <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)" class="errorMessages">
                <div *ngIf="categoryId?.errors?.['required']">
                    Kategoria jest wymagana
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Cena</mat-label>
            <input type="number" min="0" matInput placeholder="Podaj cenę produktu" formControlName="price">
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
            <mat-label>Cena promocyjna</mat-label>
            <input type="number" min="0" matInput placeholder="Podaj cenę promocyjną produktu" formControlName="salePrice">
            <div *ngIf="salePrice?.invalid && (salePrice?.dirty || salePrice?.touched)" class="errorMessages">
                <div *ngIf="salePrice?.errors?.['min']">
                    Cena musi być większa od zera
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Waluta</mat-label>
            <mat-select formControlName="currency">
                <mat-option *ngFor="let currency of currencies" [value]="currency">
                    {{currency}}
                </mat-option>
            </mat-select>
            <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="errorMessages">
                <div *ngIf="currency?.errors?.['required']">
                    Waluta jest wymagana
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Czy włączyć ten produkt do sprzedaży?</mat-label>
            <mat-select formControlName="enabled">
                <mat-option value="true">TAK</mat-option>
                <mat-option value="false">NIE</mat-option>
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
export class AdminProductFormComponent implements OnInit {

    @Input() parentForm!: FormGroup;
    categories: Array<AdminCategoryName> = [];
    currencies: Array<string> = [];

    constructor(
        private adminFormCategoryService: AdminFormCategoryService,
        private formProductCurrencyService: FormProductCurrencyService
    ) { }

    ngOnInit(): void {
        this.getCategories();
        this.getProductCurrencies();
    }

    getCategories() {
        this.adminFormCategoryService.getCategories()
            .subscribe(categories => this.categories = categories);
    }

    getProductCurrencies() {
        this.formProductCurrencyService.getProductCurrencies()
            .subscribe(currencies => this.currencies = currencies);
    }

    get name() {
        return this.parentForm.get("name");
    }

    get description() {
        return this.parentForm.get("description");
    }

    get categoryId() {
        return this.parentForm.get("categoryId");
    }

    get price() {
        return this.parentForm.get("price");
    }

    get salePrice() {
        return this.parentForm.get("salePrice");
    }

    get currency() {
        return this.parentForm.get("currency");
    }

    get slug() {
        return this.parentForm.get("slug");
    }
}

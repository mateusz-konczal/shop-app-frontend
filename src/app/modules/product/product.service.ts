import { Injectable } from '@angular/core';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { 
  }

  getProducts(): Product[] {
    return [
      {
        name: "Produkt 1",
        category: "Katgoria 1",
        description: "Opis produktu 1",
        price: 11.99,
        currency: "PLN"
      },
      {
        name: "Produkt 2",
        category: "Katgoria 2",
        description: "Opis produktu 2",
        price: 12.99,
        currency: "PLN"
      },
      {
        name: "Produkt 3",
        category: "Katgoria 3",
        description: "Opis produktu 3",
        price: 13.99,
        currency: "PLN"
      }
    ];
  }
}

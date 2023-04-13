# Shop App (frontend)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
This is the frontend part of the online shop's web application. The application uses the REST API of 
the backend part. Currently, the admin can manage products, categories and reviews. The customer can 
browse products by category, add opinions and add products to the cart. Work in progress on 
the sales process (order and payment processing) and user login.
- --
## Technologies
* Node.js 18.15.0
* npm 9.5.0
* Angular 15.2.3
* TypeScript
* HTML
* SCSS
* Git

## Usage
```
git clone https://github.com/mateusz-konczal/shop-app-frontend.git
cd shop-app-frontend
npm start (alias for command: ng serve --proxy-config proxy.config.json)
```
* Access to the shop as a customer: [localhost:4200](http://localhost:4200/)
* Access to the shop admin panel: [localhost:4200/admin](http://localhost:4200/admin)

## Demo

### Customer's cart page after adding products:
![screenshot_cart](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_cart.png?raw=true)

### Managing product reviews in the shop admin panel:
![screenshot_reviews](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_reviews.png?raw=true)

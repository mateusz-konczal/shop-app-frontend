# Shop App (frontend)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
This is the frontend part of the online shop's web application. The application uses the REST API of 
the backend part. Currently, the admin can manage products, categories, reviews, shipments, payments 
and orders. The customer can browse products by category, add opinions, add products to the cart and
place orders. The admin can also export orders from a selected period to a CSV file and view a 
sales chart for the current month (using Chart.js). Work in progress on a user login process and 
integration with a payment gateway.
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

### Listing of orders in shop admin panel:
![screenshot_admin_orders](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_orders.png?raw=true)

### Managing product reviews in shop admin panel:
![screenshot_admin_reviews](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_reviews.png?raw=true)

### Export of orders from a selected period to a CSV file in shop admin panel:
![screenshot_admin_export](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_export.png?raw=true)

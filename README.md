# Shop App (frontend)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
This is the frontend part of the online shop's web application. The application uses the REST API of 
the backend part. Currently, the admin can manage products, categories, reviews, shipments, payments, 
orders and users. The customer can browse products by category, add opinions, add products to the cart 
and place orders. The admin can also export orders from a selected period to a CSV file and view a 
sales chart for the current month (using Chart.js). In the dashboard, the admin can clear the cache of 
the entire application. Admins and customers have dedicated login and password change pages. The customer 
can also reset the password by providing an e-mail address and obtaining a special link valid for a 
certain period of time. The online shop was integrated with the Przelewy24 online payment system.
Currently, the project is being refined and then it will be deployed on a cloud platform.
- --
## Technologies
* Node.js 18.15.0
* npm 9.5.0
* Angular 15.2.3
* TypeScript
* HTML
* SCSS
* Git
* ngrok 3.3.1

## Usage
```
git clone https://github.com/mateusz-konczal/shop-app-frontend.git
cd shop-app-frontend
npm start (alias for command: ng serve --proxy-config proxy.config.json)
```
* Access to the shop as a customer: [localhost:4200](http://localhost:4200/)
* Access to the shop admin panel: [localhost:4200/admin](http://localhost:4200/admin) (default login: admin, password: test)

## Demo

### Shop homepage:
![screenshot_homepage](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_homepage.png?raw=true)

### Customer login and registration page:
![screenshot_login](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_login.png?raw=true)

### Customer's cart page after adding products:
![screenshot_cart](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_cart.png?raw=true)

### Customer's order page:
![screenshot_order](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_order.png?raw=true)

### Przelewy24 panel with payment methods:
![screenshot_przelewy24_panel](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_przelewy24_panel.png?raw=true)

### Payment confirmation available in an email:
![screenshot_przelewy24_confirmation](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_przelewy24_confirmation.png?raw=true)

### Return page after online payment:
![screenshot_return_page](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_return_page.png?raw=true)

### Shop admin dashboard:
![screenshot_admin_dashboard](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_dashboard.png?raw=true)

### Listing of orders in shop admin panel:
![screenshot_admin_orders](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_orders.png?raw=true)

### Export of orders from a selected period to a CSV file in shop admin panel:
![screenshot_admin_export](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_export.png?raw=true)

### Managing product reviews in shop admin panel:
![screenshot_admin_reviews](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_admin_reviews.png?raw=true)

### 404 error handling:
![screenshot_page_not_found](https://github.com/mateusz-konczal/shop-app-frontend/blob/master/readme/screenshot_page_not_found.png?raw=true)
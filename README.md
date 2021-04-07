# ALUART Store Front

Created a storefront where users can create an account, add items to cart, and purchase through PayPal. Admin accounts can view all users, orders and update order details.
This app uses MongoDB for the database, Express and Node for the backend, React. It also utilizes Redux for global state management.
Testing of the backend was completed with Postman.

## Special Features

- Authentication with JWT
- Client side storage with localStorage and Redux
- Connected PayPal API for payment in CAD
- Styling done through react-bootstrap

## Sample Accounts

Test out authentication with sample accounts that have different permissions. Also feel free to create a new account with no special permissions.

### Demo User Account

e-mail: kelvin@example.com
password: 123456

### Demo Admin Account

e-mail: admin@example.com
password: 123456

### Demo PayPal Account

## Running Local

Backend Only

> npm run server

Frontend Only

> npm run client

Full Stack:

> npm run dev

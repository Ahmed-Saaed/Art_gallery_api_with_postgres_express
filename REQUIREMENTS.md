# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products(Art pieces)

**user token**: `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoiYWhtZWQiLCJmaXJzdG5hbWUiOiJhaG1lZCIsImxhc3RuYW1lIjoic2FhZWQiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkOWl1RnlyN2FPWEdMbmtWZ0RTcEpKLm1aMEYuQkZBVHpnbHp2S1dOZ2oycjBmSUlQaXVka3kifSwiaWF0IjoxNjQ2NTE1MDYwfQ.3TTbJxo5RR-RCER0G_CVLSUm0HsecjkA0kB_L6akjMU"`

- `Index`: get (localhost:3000/art)
- `Show`: get (localhost:3000/art/:id)
- `update` [token required]: put (localhost:3000/art/:id)
- `Create` [token required]: post (localhost:3000/art)
- `delete` [token required]: delete (localhost:3000/art/:id)

- [OPTIONAL] Products by category (args: product category)

#### Users

- `Index` [token required]: get (localhost:3000/users)
- `Show` [token required]: get (localhost:3000/users/:id)
- `Create` [token required]: post (localhost:3000/users)
- `delete`: delete (localhost:3000/users/:id) **`kindly reminder: don't delete the user with id=1 as this is the provided token`**
- `update`: put (localhost:3000/users/:id)
- `authenticate`: post (localhost:3000/users/authenticate)

#### Orders

- `Index`: get (localhost:3000/art)
- `Show`: get (localhost:3000/art/:id)
- `Create` [token required]: post (localhost:3000/art)
- `delete` [token required]: delete (localhost:3000/art/:id)
- `add to cart`: post (localhost:3000/art/:id/products)

- Current Order by user (args: user id)[token required]
- `Completed Orders`: get(localhost:3000/completed)

## Database schema

[DBschema](./database_schema.png)

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

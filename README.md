## Blog Application Backend
Welcome to the backend repository of your Blog App! This readme will guide you through setting up, configuring, and running the backend server for your blog application. 

### Technologies
- Node.js: A JavaScript runtime for server-side development.
- Express.js: A web application framework for Node.js.
- PostgreSQL: A powerful open-source relational database management system.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Redis: An in-memory data structure store used as a cache.

### Setup project on your local machine
- To install the application locally, follow these steps:

1. Clone the repository to your local machine using:
```bash
    git clone https://github.com/abhijeetnishal/Blog-Application-Backend.git
```

2. Create a .env file in root directory and copy contents of .env.example file to .env file and add all secret keys to setup postgres database, Redis and backend.
3. Install dependencies in root directory of project using command:
```bash
    npm install
```

4. Start the server using comand:
```bash
    npm start
```

5. Open postman or other API testing tools and use http://localhost:8080/ as URL and select GET request and send request. If everything works fine, server send response as "server is live" i.e. your local setup is completed and server is running.

### Test API's
- Install Postman or any API testing application. You can visit: https://www.postman.com/downloads/
- Open Postman and use below API endpoints mentioned below:
- To test API locally, setup project locally as instructed above and use http://localhost:8080 as URL followed by below post routes.
- Blog posts routes: <br/>
  1. GET : **/posts** - Get all blog posts
  2. GET : **/posts?sort=name&category=Food** - Get blog posts according to filter based on category and sorting
  3. GET : **/posts/:id** - Get a specific blog post by ID
  4. POST : **/posts** - Create a new blog post
  5. PUT : **/posts/:id** - Update an existing blog post by ID
  6. DELETE : **/posts/:id** - Delete a blog post by ID

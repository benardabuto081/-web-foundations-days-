# Library REST API Documentation

A RESTful API design for managing books in a library system.

---

## Endpoints

### 1. List All Books
* **Method:** `GET`
* **Path:** `/api/books`
* **Description:** Retrieves a list of all available books in the library.
* **Request Body:** None
* **Success Status Code:** `200 OK`

### 2. Get One Book by ID
* **Method:** `GET`
* **Path:** `/api/books/:id`
* **Description:** Retrieves details of a single book specified by its unique ID.
* **Request Body:** None
* **Success Status Code:** `200 OK`

### 3. Create a New Book
* **Method:** `POST`
* **Path:** `/api/books`
* **Description:** Adds a new book entry to the library inventory.
* **Request Body Example:**
  ```json
  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "publishedYear": 2018,
    "isbn": "978-0735211292"
  }

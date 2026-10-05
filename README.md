# smart-hotel-management-system
# Hotel Management System – DevOps

A beginner-friendly **Hotel Management Web Application** developed by a two-member university team to demonstrate modern **DevOps practices** throughout the software development lifecycle.

The main focus of this project is to apply DevOps concepts such as **Git version control, GitHub, branching, automated testing, Docker, CI/CD, and deployment automation**.

---

## Features

### 1. User Sign Up & Sign In

* User registration
* Secure login
* Logout

### 2. Room Availability

* View available rooms
* View room type and price

### 3. Room Booking

* Select and book a room
* Check-in and check-out dates
* Booking confirmation

### 4. Customer Management

* Add customer details
* View and update customer information

### 5. Booking Management

* View bookings
* Cancel bookings
* Update booking status

### 6. Admin Dashboard

* View total rooms
* View available rooms
* View total bookings
* View total customers

---

## DevOps Technologies

* Git
* GitHub
* GitHub Actions
* Docker
* Docker Compose
* CI/CD
* Automated Testing
* Deployment

---

## Project Objective

The main objective of this project is to apply DevOps practices throughout the software development lifecycle.

The project demonstrates:

* Version control using Git and GitHub
* Feature-based Git branching
* Collaborative development
* Automated testing
* Continuous Integration (CI)
* Containerization using Docker
* Continuous Deployment (CD)
* Deployment automation

---

## Project Structure

```text
hotel-management-system-devops/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── backend/
│   ├── src/
│   └── ...
│
├── tests/
│   ├── unit/
│   └── api/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Git Branching Strategy

The `main` branch contains stable and tested code.

Each team member works on a separate feature branch instead of directly modifying the `main` branch.

Example:

```text
main
│
├── member1-room-booking
│
└── member2-room-management
```

### Development Workflow

```text
Create Feature Branch
        ↓
Develop Feature
        ↓
Run Tests
        ↓
Commit Changes
        ↓
Push Branch to GitHub
        ↓
Create Pull Request
        ↓
Code Review
        ↓
Merge into main
```

### Important Rule

**Do not push development code directly to `main`.**

Each team member should create and work on their own branch.

Example:

```bash
git checkout -b member1-room-booking
```

After completing the feature:

```bash
git add .
git commit -m "Add room booking feature"
git push -u origin member1-room-booking
```

A Pull Request can then be created to merge the branch into `main`.

---

## Testing

Testing is used to verify that the main features of the Hotel Management System work correctly.

The project includes:

* Unit Testing
* API Testing
* Automated Testing through GitHub Actions

### Unit Testing

Unit tests verify individual functions or components of the application.

| Feature             | Example Test                          |
| ------------------- | ------------------------------------- |
| User Authentication | Check valid and invalid sign-in       |
| Room Availability   | Check available rooms                 |
| Room Booking        | Check that a valid booking is created |
| Customer Management | Check that a customer can be added    |
| Booking Management  | Check that a booking can be cancelled |
| Admin Dashboard     | Check dashboard statistics            |

Example:

```javascript
test("should calculate available rooms correctly", () => {
    const totalRooms = 20;
    const bookedRooms = 8;

    const availableRooms = totalRooms - bookedRooms;

    expect(availableRooms).toBe(12);
});
```

### API Testing

API tests verify that the backend endpoints return the expected responses.

| Feature             | API Endpoint                   | Expected Result              |
| ------------------- | ------------------------------ | ---------------------------- |
| Sign Up             | `POST /api/auth/signup`        | Creates a new user           |
| Sign In             | `POST /api/auth/signin`        | Authenticates the user       |
| Room Availability   | `GET /api/rooms/available`     | Returns available rooms      |
| Room Booking        | `POST /api/bookings`           | Creates a booking            |
| Customer Management | `POST /api/customers`          | Creates a customer           |
| Booking Management  | `PUT /api/bookings/:id/cancel` | Cancels a booking            |
| Admin Dashboard     | `GET /api/dashboard`           | Returns dashboard statistics |

Example:

```javascript
test("GET /api/rooms/available should return available rooms", async () => {
    const response = await request(app)
        .get("/api/rooms/available");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("rooms");
});
```

---

## Docker

Docker is used to containerize the application so that it can run consistently across different environments.

The project uses:

* Dockerfile
* Docker Compose

Example application structure:

```text
Frontend Container
       ↓
Backend Container
       ↓
Database Container
```

Docker Compose can be used to start the required services together.

### Build and Start Containers

```bash
docker compose up --build
```

### Stop Containers

```bash
docker compose down
```

---

## Deployment

The containerized Hotel Management System can be deployed to a cloud or hosting platform so that users can access the application online.

The deployment process uses the Docker images created during the CI/CD pipeline.

### Deployment Flow

```text
Developer
    ↓
Push Code to GitHub
    ↓
GitHub Actions
    ↓
Run Automated Tests
    ↓
Build Application
    ↓
Build Docker Image
    ↓
Deploy Docker Container
    ↓
Live Hotel Management System
```

### Deployment Steps

1. **Push Code to GitHub**

   * Developers push changes to their feature branches.
   * Completed features are merged into the `main` branch through a Pull Request.

2. **Run CI/CD Pipeline**

   * GitHub Actions automatically runs the required tests.
   * The application is built after the tests pass.

3. **Build Docker Image**

   * A Docker image is created for the application.
   * The Docker image contains the application and its required dependencies.

4. **Deploy the Application**

   * The Dockerized application is deployed to a suitable cloud or hosting platform.
   * Environment variables and database configuration are provided securely.

5. **Access the Application**

   * After successful deployment, users can access the Hotel Management System through its public URL.

### Deployment Environment

The project is designed to support deployment using a Docker-compatible hosting or cloud platform.

The final deployment platform will be selected during the implementation stage.

```text
GitHub Repository
       ↓
GitHub Actions
       ↓
Docker Image
       ↓
Cloud / Hosting Platform
       ↓
Hotel Management Web Application
```

### Deployment Verification

After deployment, basic checks are performed to verify that:

* The application is accessible.
* User Sign Up and Sign In work correctly.
* Room availability can be viewed.
* Room bookings can be created.
* Customer information can be managed.
* Booking management functions correctly.
* The Admin Dashboard displays the required information.

---

## CI/CD Pipeline

GitHub Actions is used to automate the CI/CD process.

The basic pipeline is:

```text
Git Push / Pull Request
          ↓
GitHub Actions
          ↓
Install Dependencies
          ↓
Run Unit Tests
          ↓
Run API Tests
          ↓
Build Application
          ↓
Build Docker Image
          ↓
Deployment
```

If the tests fail, the pipeline stops and the changes should be fixed before merging into the `main` branch.

---

## GitHub Actions

The GitHub Actions workflow is stored inside:

```text
.github/workflows/
```

Example:

```text
.github/
└── workflows/
    └── ci.yml
```

The workflow can automatically:

1. Checkout the source code
2. Install dependencies
3. Run unit tests
4. Run API tests
5. Build the application
6. Build the Docker image
7. Deploy the application

---

## Team Members

| Member   | Responsibilities                                             |
| -------- | ------------------------------------------------------------ |
| Member 1 | Room booking, room availability, frontend development        |
| Member 2 | Customer management, booking management, backend development |

Both members collaborate using GitHub branches, Pull Requests, code reviews, automated testing, and CI/CD.

---

## Complete DevOps Workflow

The overall workflow of the project is:

```text
Developer
    ↓
Git Branch
    ↓
GitHub
    ↓
Pull Request
    ↓
Code Review
    ↓
Automated Testing
    ↓
GitHub Actions
    ↓
Build Application
    ↓
Docker
    ↓
Docker Image
    ↓
Deployment
    ↓
Live Hotel Management System
```

---

## Future Improvements

Possible future improvements include:

* Online payment integration
* Email booking notifications
* Room service management
* Staff management
* Hotel reviews and ratings
* Advanced reporting
* Cloud deployment

---

## License

This project is developed for **educational and university project purposes**.

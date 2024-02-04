# Task Tracker Application Documentation



## Technologies Used:

### Backend (Java Spring Boot):
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL (Database)
- Maven (Build Tool)

### Frontend (React):
- React
- React Router
- Axios (HTTP client)

## How to Run Locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/zahidgul107/task_tracker_application.git
   cd your-repository

## Backend Setup:

### 1. Database Setup:
- Install MySQL and create a database named `task_tracker_db`.
- Run the following SQL script to create the `roles` table:
  ```sql
  CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
  );

  INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_MODERATOR');

### 2. Spring Boot Configuration:
- Open the src/main/resources/application.properties file.
- Configure the database connection:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/task_tracker_db
spring.datasource.username=your-mysql-username
spring.datasource.password=your-mysql-password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Run the Spring Boot Application:
- Open the project in your favorite IDE (e.g., STS).
- Run the TaskTrackerApplication class.

## Frontend Setup:
### 1. Install Node.js and npm:
Node.js
### 2. Navigate to the React Project:
Open the terminal and go to the frontend directory
```bash
cd frontend
```
### 3. Install Dependencies:
Run the following command to install frontend dependencies:
```bash
npm install
```
### 4. Start the React Application:
- Run the following command to start the React app:
```bash
npm start
```
## Application Functionality:
#### 1. Sign Up:
- Access the application in the browser (http://localhost:3000).
- Click on the "Sign Up" link.
- Fill in the required information and submit the form.
#### 2. Login:
- After signing up, navigate back to the login page.
- Enter your credentials and log in.
#### 3. Add Task:
- Once logged in, you can add a new task by clicking on the "Add Task" link.
- Fill in the task details and submit the form.
#### 4. View Tasks:
- You can view all tasks by clicking on the "View Tasks" link.
- Tasks are displayed in a paginated table.
#### 5. Search Task:
- Access the "List of Tasks" page.
- Use the search form to filter tasks based on status and due date.
#### 6. Logout:
- Click on the "Logout" link to log out of the application.

# Coding Challenge REST API

This is a RESTful API built with Node.js, Express, and MySQL using Sequelize ORM. It provides endpoints for managing employee records — including creating and retrieving employee data.

## Features

* RESTful API using Express.js
* Sequelize ORM with MySQL database
* Nodemon configured for development

## Getting Started

## Postman collection
https://shreedhar-402330.postman.co/workspace/Shreedhar's-Workspace~836c7bc7-4d3c-4670-84cc-7cd3c92978f7/collection/45801604-ce843ad0-5193-4020-8e43-6d6a874710d4?action=share&creator=45801604

## Database schema
<img width="1023" alt="image" src="https://github.com/user-attachments/assets/385fd2aa-5eb0-4c04-b5c2-fcfbf7b3f774" />

## Table scripts
Departments
```
CREATE TABLE `Departments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

Employees
```
CREATE TABLE `Employees` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `managerId` int unsigned DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `title` varchar(15) DEFAULT NULL,
  `departmentId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `Departments` (`id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`managerId`) REFERENCES `Employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


```

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
* [MySQL](https://www.mysql.com/) database installed and running

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/coding-challenge.git
cd coding-challenge
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
node .
```

## API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/employees`     | Get all employees     |
| GET    | `/departments` | Get all departments    |
| POST   | `/employee`     | Create new employee   |
| POST   | `/department`     | Create new department   |
| GET    | `/employees/search` | Search for employee by name, title and department |
| GET | `/employees/heirarchy/:employeeId` | Get team hierarchy by employee id |


## Technologies Used

* Node.js
* Express.js (v5)
* MySQL
* Sequelize ORM
* dotenv
* nodemon (development)

## Author

Shreedhar Ramnarain


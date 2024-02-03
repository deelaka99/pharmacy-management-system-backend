# Pharmacy Management System REST API

This repository contains the codebase for a Pharmacy Management System REST API built with Node.js and Express.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- Git installed on your machine. You can download it from [Git official website](https://git-scm.com/).

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/pharmacy-management-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd pharmacy-management-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Define environment variables in the `.env` file:

    ```makefile
    PORT=3000
    DB_CONNECTION_STRING=sqlite://path/to/your/database.sqlite
    ```

    Replace `path/to/your/database.sqlite` with the path where you want to store your SQLite database file.

### Running the Server

To start the server, run the following command:

```bash
node index.js
```

The server will start running at http://localhost:3000 by default.

### Usage
You can use tools like Postman to interact with the API endpoints. Import the provided Postman collection to get started with testing the endpoints.

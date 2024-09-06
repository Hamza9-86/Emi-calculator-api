# Emi-calculator-api
Prerequisites
Before running the project, ensure you have the following installed:

Node.js (>=14.x.x)
PostgreSQL (>=12.x.x)
Setup Instructions
1. Clone the Repository
  git clone https://github.com/yourusername/emi-calculator-api.git
  cd emi-calculator-api
2. Install Dependencies
    npm install
3. Set Up the Database
Create a PostgreSQL Database:

You need to create a PostgreSQL database for the project. You can do this using a PostgreSQL client or command line.

  CREATE DATABASE emi_calculator;
  Update Database Configuration:

Update the database connection settings in the config/config.js file:

  module.exports = {
    development: {
      username: 'your_db_username',
      password: 'your_db_password',
      database: 'emi_calculator',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    // Add other environments (test, production) if needed
  };
Run Database Migrations:

Create tables in the database by running the Sequelize migrations. Ensure you have Sequelize CLI installed:

  npx sequelize-cli db:migrate
4. Set Up Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

  DATABASE_URL=postgres://username:password@localhost:5432/emi_calculator
  PORT=3000
Replace username, password, and localhost with your PostgreSQL credentials and host.

5. Start the Server
Run the server using Node.js:
  npm start
The server will start and listen on the port specified in the .env file (default is 3000).

API Endpoints
POST /api/calculate-emi
Description: Calculate EMI and get month-wise breakdown.

  Request Body:
  {
    "loan_amount": 500000,
    "interest_rate": 8.5,
    "loan_tenure_months": 60,
    "prepayment_amount": 20000
  }
  Response:

  {
    "loanAmount": 500000,
    "interestRate": 8.5,
    "loanTenureMonths": 60,
    "emi": 10234.65,
    "prepayment": 20000,
    "monthWisePayments": [
    {
      "month": 1,
      "emiPaid": 10234.65,
      "interestPaid": 3541.67,
      "principalPaid": 6692.98,
      "prepayment": 20000,
      "remainingBalance": 473307.02
    },
    // ... additional months
  ]
}
GET /api/emis
Description: Fetch all EMI records from the database.

Response:
[
  {
    "id": 1,
    "loan_amount": 500000,
    "interest_rate": 8.5,
    "loan_tenure_months": 60,
    "emi": 10234.65,
    "prepayment_amount": 20000,
    "remaining_balance": 473307.02,
    "createdAt": "2024-09-07T00:00:00.000Z",
    "updatedAt": "2024-09-07T00:00:00.000Z"
  }
]
GET /api/emi/
Description: Fetch a specific EMI record by its ID.

Response:
{
  "id": 1,
  "loan_amount": 500000,
  "interest_rate": 8.5,
  "loan_tenure_months": 60,
  "emi": 10234.65,
  "prepayment_amount": 20000,
  "remaining_balance": 473307.02,
  "createdAt": "2024-09-07T00:00:00.000Z",
  "updatedAt": "2024-09-07T00:00:00.000Z"
}
Testing
To run tests, if any are provided, use:
  npm test
Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

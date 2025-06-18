# TransactionDashboard

## Project Overview

**TransactionDashboard** is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This application allows users to view, manage, and visualize transactions through an interactive dashboard. It features a modern, responsive design with a material color scheme, and includes a transactions table, statistics overview, and bar chart visualization for efficient tracking and analysis.

## Features

- **Transactions Table**: Displays a list of transactions for the selected month with search functionality based on title, description, and price.
- **Statistics Overview**: Shows the total sales amount, number of sold items, and number of not sold items for the selected month.
- **Bar Chart Visualization**: Visualizes the number of items within specified price ranges for the selected month.
- **Month Filter**: Dropdown for selecting a month, with the default selection set to March.
- **Search Functionality**: A search box to filter transactions by title, description, or price.
- **Pagination**: Navigate through transactions with "Next" and "Previous" buttons.
- **Responsive Design**: Ensures usability across desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Chart.js (`react-chartjs-2`)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Others**: Axios for API requests

## Installation Instructions

Follow these steps to set up the project on your local machine:

### Prerequisites

- **Node.js** (version >= 14)
- **MongoDB** (running locally or using a cloud service like MongoDB Atlas)
- **Git**

### Setting Up the Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TransactionDashboard.git
   cd TransactionDashboard/backend

2. **Install the backend dependencies**:
    npm install

3. **Start your MongoDB server** (if running locally):
    mongod

4. **Initialize the database with seed data**:
    npm start
    - Visit http://localhost:5000/api/initialize to populate the database with sample transactions or you can  use postman to do the same.

### Setting Up the Frontend
1. **Navigate to the frontend directory**:
    cd ../frontend
    
2. **Install the frontend dependencies**:
    npm install

3. **Start the frontend application**:
    npm run dev

4. **Access the application**:
    Open your browser and visit http://localhost:5173 to view the application.

## API Endpoints
The application uses several APIs to fetch and manage data:

### Transaction APIs

The application uses the following APIs to fetch and manage transactions:

- **GET /api/transactions**: 
  - Lists transactions with pagination and search functionality based on the selected month.
  - Supports filtering by title, description, and price.
  
- **GET /api/statistics**: 
  - Fetches total sales amount, sold items, and not sold items for the selected month.
  
- **GET /api/barchart**: 
  - Retrieves data for the bar chart, showing the number of items in specified price ranges for the selected month.
  
- **GET /api/piechart**: 
  - Fetches data for visualizing item categories and their respective counts for the selected month.
  
- **GET /api/initialize**: 
  - Seeds the database with initial transaction data.


## Screenshots
![Screenshot](assets/"C:\Users\AMARA\OneDrive\Pictures\Screenshots\Screenshot 2025-06-18 151652.png")

# EPI-USE Africa Employee Management System

This project is a web application designed to manage the employee hierarchy for EPI-USE Africa. The application allows administrators to perform CRUD (Create, Read, Update, Delete) operations on employee data, manage reporting structures, visualize the company hierarchy, and much more.

## Table of Contents

- [EPI-USE Africa Employee Management System](#epi-use-africa-employee-management-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Components](#components)
    - [Main Components:](#main-components)
    - [Additional Components:](#additional-components)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Employee Data Management**: Create, read, update, and delete employee records.
- **Reporting Structure Management**: Define and manage reporting structures within the organization.
- **Hierarchy Visualization**: Display an organogram view of the company hierarchy using a tree structure.
- **Search and Filter**: Easily search and filter employees by name, department, or role.
- **Sortable Employee List**: Sort employee data by various criteria such as name, department, or role.
- **Gravatar Integration**: Automatically fetch and display employee profile pictures using Gravatar.
- **Side Navigation Bar**: Access various application features via a side navigation bar that is consistent across different pages.

## Technologies Used

- **Vue.js**: The front-end framework used to build the application.
- **PrimeVue**: UI components library, used unstyled.
- **MongoDB**: Database to store and manage employee data.
- **Express.js**: Backend framework for building APIs.
- **Node.js**: JavaScript runtime used to build the backend.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Gravatar**: Service for managing profile pictures via email.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zionvanwyk/employeedb.git
   ```

2. Navigate to the project directory:

   ```bash
   cd employeedb
   ```

3. Install dependencies for the frontend:

   ```bash
   npm install
   ```

4. Install dependencies for the backend:

   ```bash
   cd server
   npm install
   ```

5. Set up environment variables:

   - Create a `.env` file in the root directory of the backend.
   - Add your MongoDB connection string, Gravatar settings, and any other required environment variables.

6. Run the project:

   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     npm run serve
     ```

7. Open your browser and navigate to `http://localhost:8080` to see the application.

## Usage

- **Dashboard**: The main page after logging in, where you can view a summary of employee data.
- **Employee Management**: Add, edit, delete, and view detailed information about employees.
- **Organogram View**: Visualize the reporting structure of the organization in a tree format.
- **Settings**: Adjust application settings, including managing user accounts and preferences.

## Project Structure

```plaintext
epiuse-africa-employee-management/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── services/
│   │   ├── views/
│   │   ├── App.vue
│   │   ├── main.js
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
├── .gitignore
├── README.md
```

## Components

### Main Components:

- **AppHeader.vue**: Contains the top bar with a logo, profile picture, and menu icon.
- **SideNavbar.vue**: The side navigation bar available across various pages.
- **OrganogramView.vue**: Displays the company hierarchy in a tree structure.
- **SettingsPage.vue**: The settings page, which includes options for managing user accounts, preferences, and application features.

### Additional Components:

- **EmployeeCard.vue**: Displays individual employee information.
- **EmployeeForm.vue**: Form for adding or editing employee data.
- **SearchBar.vue**: Provides a search interface for filtering employees.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License.

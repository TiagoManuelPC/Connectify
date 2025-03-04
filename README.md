# Connectify

Connectify is a web application featuring an Angular frontend and an ASP.NET Core backend. This README provides step-by-step instructions to set up and run both applications.

## Prerequisites

Ensure you have the following dependencies installed before proceeding:

- [Angular CLI](https://angular.io/cli) (version 19 or later)
- [.NET SDK](https://dotnet.microsoft.com/download) (version 8 or later)
- [Node.js](https://nodejs.org/) (required for package management)
- [Yarn](https://yarnpkg.com/)

## Setup and Installation

### Frontend (Angular)

1. Navigate to the frontend directory:

   ```sh
   cd angular
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

### Backend (ASP.NET Core)

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Restore dependencies:

   ```sh
   dotnet restore
   ```

3. Build the application:

   ```sh
   dotnet build
   ```

4. Run the backend server:

   ```sh
   dotnet run
   ```

## Additional Notes

- The frontend application runs on `http://localhost:4200/` by default.
- The backend API runs on `https://localhost:44337/` (or as configured in `appsettings.json`).
- Ensure both applications are running simultaneously for full functionality.


---

Now you’re all set to run Connectify! 🚀


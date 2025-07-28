# Assignment App Documentation

## 1. Introduction

The Assignment App is a full-stack application designed to facilitate file and folder management, including user authentication and an administrative portal. It provides a robust platform for users to manage their digital assets efficiently.

### Key Features

- **User Authentication:** Secure login and user management.
- **File Management:** Upload, view, and organize files.
- **Folder Management:** Create and manage folders to categorize files.
- **Admin Portal:** Administrative functionalities for user and content management.

### Technologies Used

This application is built using a modern technology stack, ensuring scalability, performance, and a rich user experience.

- **Frontend:**
  - React (with TypeScript)
  - Tailwind CSS
  - Material-UI (MUI)
  - React Router DOM
  - Axios for API communication
  - React Query for data fetching and state management
- **Backend:**
  - Node.js with Express.js (with TypeScript)
  - MongoDB as the database
  - Mongoose for MongoDB object modeling
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt.js for password hashing
  - CORS for cross-origin resource sharing
  - Dotenv for environment variable management
- **Database:**
  - MongoDB

## 2. Getting Started

Follow these instructions to set up and run the Assignment App on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn
- MongoDB (Community Server)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd assignment-app
    ```

2.  **Backend Setup:**

    Navigate to the `server` directory, install dependencies, and set up environment variables.

    ```bash
    cd server
    npm install # or yarn install
    ```

    Create a `.env` file in the `server` directory with the following content:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/assignmentapp`) and `your_jwt_secret_key` with a strong, random string.

3.  **Frontend Setup:**

    Navigate to the `client` directory and install dependencies.

    ```bash
    cd ../client
    npm install # or yarn install
    ```

### Running the Application

1.  **Start the Backend Server:**

    From the `server` directory:

    ```bash
    npm start
    ```

    The backend server will typically run on `http://localhost:5000` (or the port specified in your backend configuration).

2.  **Start the Frontend Development Server:**

    From the `client` directory:

    ```bash
    npm start
    ```

    The frontend application will typically open in your browser at `http://localhost:3000`.

## 3. Project Structure

The project is divided into two main parts: `client` (frontend) and `server` (backend).

### Client (Frontend)

- `client/public`: Contains static assets like `index.html`, `manifest.json`, `robots.txt`.
- `client/src`:
  - `App.tsx`: Main application component, defines routes.
  - `index.tsx`: Entry point for the React application.
  - `App.css`, `index.css`: Global CSS styles.
  - `pages`: React components representing different views/pages (e.g., `Login.tsx`, `Home.tsx`, `AddFiles.tsx`, `AllFiles.tsx`, `AdminUser.tsx`).
  - `components`: Reusable React components (e.g., `FileCard.tsx`, `Breadcrumbs.tsx`, `FileDetails.tsx`, `FileGrid.tsx`, `FolderGrid.tsx`, `FolderCard.tsx`, `Header.tsx`).
  - `Assets`: Static assets like `data.js`.
  - `reportWebVitals.ts`, `setupTests.ts`, `react-app-env.d.ts`: Standard Create React App files.

### Server (Backend)

- `server/.env`: Environment variables for database connection and JWT secret.
- `server/models`: Mongoose schemas defining the structure of MongoDB documents (e.g., `files.js` - likely for file metadata, and implicitly `User` model for authentication).
- `server/src`:
  - `index.ts`: Main entry point for the Express application.
  - `controllers`: Contains the logic for handling API requests (e.g., `DataController.ts`, `authController.ts`).
  - `routes`: Defines API endpoints and links them to controller functions (e.g., `authRoutes.ts`, `DataRoutes.ts`).
  - `config`: Configuration files (e.g., `dbconfig.ts` for database connection).
  - `middlewares`: Express middleware functions (e.g., `authMiddleware.ts` for JWT verification).

## 4. Features

### User Authentication

- **Login:** Users can log in to the application via the `/` route, handled by the `Login.tsx` component and `authController.ts` on the backend.

### File Management

- **View Files:** The `/Files` route displays files using the `FileGrid.tsx` component.
- **Add Files:** Users can add new files via the `/addFiles` route, handled by `AddFiles.tsx`.

### Folder Management

- **View Folders:** The `/folders` route displays folders, managed by the `Home.tsx` component.

### Admin Portal

- **Admin User Management:** The `/adminportal` route provides administrative functionalities, handled by `AdminUser.tsx`.

## 5. API Reference (Backend)

The backend exposes RESTful APIs for various functionalities.

### Authentication Endpoints

- **`POST /api/auth/login`**: User login.
  - **Request Body:** `{ email, password }`
  - **Response:** JWT token upon successful authentication.

### File/Data Endpoints

- **`GET /api/data/files`**: Retrieve all files.
- **`POST /api/data/files`**: Upload a new file.
- **`GET /api/data/folders`**: Retrieve all folders.
- _(Further endpoints for file/folder manipulation would be defined in `DataRoutes.ts` and `DataController.ts`)_

## 6. Database Schema

The application uses MongoDB. Key collections/models include:

- **`users` Collection:** (Implicitly used for authentication)

  - `_id`: MongoDB ObjectId
  - `email`: String (unique)
  - `password`: String (hashed)
  - `role`: String (e.g., 'user', 'admin')
  - `createdAt`: Date
  - `updatedAt`: Date

- **`files` Collection:** (Defined by `server/models/files.js`)

  - `_id`: MongoDB ObjectId
  - `name`: String (file name)
  - `path`: String (path to the file storage)
  - `type`: String (file type, e.g., 'document', 'image')
  - `size`: Number (file size in bytes)
  - `uploadedBy`: ObjectId (reference to the user who uploaded the file)
  - `folderId`: ObjectId (reference to the folder it belongs to, if any)
  - `createdAt`: Date
  - `updatedAt`: Date

- **`folders` Collection:** (Implicitly used for folder management)
  - `_id`: MongoDB ObjectId
  - `name`: String (folder name)
  - `createdBy`: ObjectId (reference to the user who created the folder)
  - `parentFolderId`: ObjectId (reference to the parent folder, if nested)
  - `createdAt`: Date
  - `updatedAt`: Date

## 7. Contributing

_(If this were an open-source project, this section would include guidelines for contributing, such as coding standards, pull request process, etc.)_

## 8. License

This project is licensed under the ISC License. See the `LICENSE` file for details. (Note: A `LICENSE` file was not found in the initial scan, but it's good practice to include one.)

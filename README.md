# Dynamic User Availability and Event Scheduling System

## Project Overview
Welcome to the Dynamic User Availability and Event Scheduling System! This web-based application enables users to set their availability for specific days or the entire week. Administrators can view this availability and schedule one-on-one or group sessions accordingly. Our focus is on delivering a clean, intuitive, and user-friendly interface.

## Features

- **User Availability Capture**: 
  - Users can log in and set their availability for specific days or the entire week.
  
- **Admin Scheduling Interface**: 
  - Both admins and users can view user availability.
  - Admins can schedule sessions based on the availability.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Frontend and backend hosted on Render

## Setup Instructions

### Frontend

1. **Clone the Repository**
    ```bash
    git clone https://github.com/NILESH211807/scheduler-app
    cd scheduler-app/frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment Variables**
    - Create a `.env` file in the `frontend` directory and add the backend base URL:
      ```env
      VITE_URI=http://localhost:3000
      ```

4. **Start the Development Server**
    ```bash
    npm run dev
    ```

### Backend

1. **Navigate to the Backend Directory**
    ```bash
    cd scheduler-app/backend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Development Server**
    - Using Node.js:
      ```bash
      node app.js
      ```
    - Using Nodemon (for auto-reloading):
      ```bash
      nodemon app.js
      ```


## Contact
For any questions or inquiries, please reach out to [your-email@example.com](mailto:nileshkumar0815@gmail.com).

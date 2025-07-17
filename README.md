
# Tickr - Another To-Do Application

## Overview

Tickr is a full-stack To-Do application built with a Django-backend and React-frontend, featuring user authentication and CRUD operations. It allows users to manage their tasks with features like status toggling, filtering, and protected routes ensuring only authenticated users can access their to-do list.

---

## Features

- Register a new user or login with existing credentials.
- Create new tasks by providing a title, description, and due date.
- Toggle task completion status using the checkboxes.
- Edit or delete tasks by clicking on a task to view details.
- Filter tasks using the dropdown filter to see All, Pending, or Completed tasks.
- Logout when done to secure your session.

---

## Technologies Used

- **Backend:** Django, Django REST Framework, Simple JWT, django-cors-headers
- **Database:** SQLite
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, lucide-react, axios
- **API:** RESTful
- **Documentation:** Postman (published [here](https://documenter.getpostman.com/view/39531698/2sB34ijKF1))

---

## API Documentation

Full API documentation is available on Postman:  
[https://documenter.getpostman.com/view/39531698/2sB34ijKF1](https://documenter.getpostman.com/view/39531698/2sB34ijKF1)

---

## Screenshots

Screenshots demonstrating app functionality are available in the `Screenshots` folder in this repository.

---

## Deployment Instructions

Clone the repository:
```bash
git clone https://github.com/20101301-Alina-Hasan/Tickr.git
   ```
   
### Django Backend Setup

1. Navigate to the Backend folder then, create and activate a virtual environment:

   ```bash
   cd Backend
   python -m venv venv
   venv\Scripts\activate.bat
   ```

2. Install required packages:

   ```bash
   pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. Navigate to to_do_app folder and Run database migrations:

   ```bash
   cd to_do_app
   python manage.py migrate
   ```

4. Start the development server:

   ```bash
   python manage.py runserver
   ```

5. Backend API will be available at `http://localhost:8000/api/`

### React Frontend Setup via Vite

1.  Navigate to the Frontend folder and Install dependencies:

    ```bash
    npm install
    ```

2.  Start the development server:

    ```bash
    npm run dev
    ```

3.  Open your browser and visit `http://localhost:5173` (or the whatever port is shown on your terminal)

## License

This project is for assessment purposes.

# AI Assistant Frontend

An AI-powered web application that helps prospective learners understand educational programs through an intelligent chat interface.

This frontend is built with **React.js** and communicates with the Laravel backend via REST APIs.

---

## Features

- Secure Login
- Role-based Authorization
- AI Chat Interface
- Chat Session Management
- Conversation History
- Create New Chat
- Resolve Chat Sessions
- Delete Chat Sessions
- Loading Indicator while AI responds
- Dashboard with Analytics
- Recent Conversations
- Session Trend Chart
- Responsive UI
- Permission-based Navigation

---

## Tech Stack

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- ApexCharts
- Boxicons

---

## Project Structure

```
src/
│
├── api/
├── assets/
├── components/
├── contexts/
├── layouts/
├── pages/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Chat/
│   ├── Users/
│   └── ProgramKB/
│
├── routes/
├── services/
├── utils/
└── App.jsx
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to project

```bash
cd asa_frontend
```

Install dependencies

```bash
npm install
```

---

## Configuration

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:8000/api
```

If you are using Laravel Herd, for example:

```env
VITE_API_URL=http://ai_assistant_backend.test/api
```

---

## Run Development Server

```bash
npm run dev
```


---

## Build Production

```bash
npm run build
```

---

## User Roles

### Admin

- Dashboard
- Analytics
- Chat Monitoring
- User Management
- Review Conversations
- Resolve Follow-up Chats

### User

- Login
- Create Chat Sessions
- Ask Questions
- View Conversation History

---

## Main Modules

### Authentication

- Login
- Logout

### Dashboard

- Total Sessions
- Active Sessions
- Resolved Sessions
- Follow-up Sessions
- Session Trend
- Recent Conversations

### AI Chat

- New Chat
- Message History
- AI Responses
- Resolve Chat
- Delete Chat
- Loading State

### Knowledge Base

- Program FAQs
- Eligibility
- Fees
- Certificates
- Support Process

### User Management

- CRUD Users
- Role Assignment
- Active / Inactive Status

---

## Folder Highlights

### services/

Contains all API calls.

Example

```
authService.js
chatService.js
dashboardService.js
userService.js
```

---

### components/

Reusable UI components.

Examples

- Navbar
- Sidebar
- Stats Card
- Delete Modal
- Toast
- Permission Wrapper

---

### pages/

Contains page level components.

Examples

- Dashboard
- Chat
- Users
- Login

---

## Authentication

Sanctum Token is stored in Local Storage.

Each request automatically attaches

```
Authorization: Bearer <token>
```

using Axios Interceptors.

---

## Permissions

The application supports permission-based rendering.

Example

```jsx
<Permission permission="dashboard.view">
    <Dashboard />
</Permission>
```

---

## Dashboard Analytics

- Total Chat Sessions
- Active Sessions
- Follow-up Sessions
- Resolved Sessions
- Recent Conversations
- Session Trend Chart

---

## Future Improvements
- Category Trend report
- Search Conversations

---

## Scripts

Install packages

```bash
npm install
```

Start

```bash
npm run dev
```

Build

```bash
npm run build
```


---

## Backend

This application communicates with the Laravel Backend API.

Ensure the backend server is running before starting the frontend.

---

## Author

**Sanat Gawade**
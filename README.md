# Blood-Care

## Short Description
This is a **[Blood-Care]**, a web application built using **[Tech Stack, Next.js, Node.js, Express, MongoDB]**.  
It allows users to **[briefly describe main functionality, manage donors, view testimonials, handle authentication, etc.]**.  
The app includes both **public** and **protected routes** with authentication.

---

## Setup & Installation

### Prerequisites
- Node.js v18+  
- npm v9+ or yarn  
- MongoDB (local or cloud)  

### Installation Steps
1. Clone the repository:
   ```bash
   https://github.com/hamidur800/blood-care-client.git
   cd blood-care-client



## Route Summary

### Public Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Landing page |
| `/login` | GET/POST | User login |
| `/register` | GET/POST | User registration |
| `/doners` | GET | List all donors |

### Protected Routes (Require Authentication)
| Route | Method | Description |
|-------|--------|-------------|
| `/doners/:id` | GET | View single donor details |
| `/add-doner` | POST | Add a new donor |

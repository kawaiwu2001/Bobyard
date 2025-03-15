# Comments Application

A full-stack comments application built with React.js frontend and Django backend, using PostgreSQL as the database.

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- PostgreSQL 12 or higher
- npm or yarn

## Setup Instructions

### 1. PostgreSQL Setup

```bash
# Install PostgreSQL (Mac)
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database and user
psql postgres

# In psql shell:
CREATE DATABASE bobyard_db;
CREATE USER bobyard WITH PASSWORD '12345';
ALTER ROLE bobyard SET client_encoding TO 'utf8';
ALTER ROLE bobyard SET default_transaction_isolation TO 'read committed';
ALTER ROLE bobyard SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE bobyard_db TO bobyard;
\q
```

### 2. Backend Setup (Django)

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd comment_system
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000/`

### 3. Frontend Setup (React)

```bash
# Install dependencies
cd comment-app
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173/`


## API Endpoints

- `GET /api/comments/` - List all comments
- `POST /api/comments/` - Create a new comment
- `PUT /api/comments/<id>/update/` - Update a comment
- `DELETE /api/comments/<id>/delete/` - Delete a comment

Postman's link to test:
https://www.postman.com/telecoms-engineer-65041868/workspace/bobyard

## Environment Variables

Backend (`.env`):
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://bobyard:12345@localhost:5432/bobyard_db
```

## Dependencies

Backend:
- Django
- Django REST Framework
- psycopg2-binary
- django-cors-headers

Frontend:
- React
- Axios
- date-fns

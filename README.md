# No-Code API Builder (Backend) 🚀

A powerful SaaS backend built with **NestJS** that allows users to create, manage, and execute dynamic API endpoints without writing code.

## 🏗️ Architecture & Logic
The system is built on a hierarchical structure:
User -> Projects -> Endpoints -> Actions.

The core of the platform is the **Dynamic Engine**, a routing layer that intercepts custom requests and executes logic (Mocks, Database operations, etc.) based on database-stored configurations.

## 🛠️ Tech Stack
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database:** MySQL 8.0
- **ORM:** Sequelize-TypeScript
- **Containerization:** Docker & Docker Compose
- **Security:** Passport.js + JWT Strategy + Bcrypt

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose installed.

### Installation & Setup
1. Clone the repository.
2. Create a .env file in the backend/ directory.
3. Spin up the containers: docker-compose up --build
4. Access the API at http://localhost:3000/api/v1

## 🚦 Core Endpoints (V1)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | /auth/register | User registration | No |
| POST | /auth/login | Get JWT Access Token | No |
| POST | /projects | Create a new project container | Yes |
| POST | /projects/:id/endpoints | Define dynamic logic (MOCK/DB) | Yes |
| ANY | /run/:projectId/* | Execute dynamic routes | Public |

## 🧪 Testing with Postman
- A Postman collection is suggested for testing.
- Features automated token management via Collection Variables and Test Scripts.

## 🗺️ Roadmap
- [ ] Implement MOCK_RESPONSE logic in Dynamic Engine.
- [ ] Virtual Database storage (JSON-based MySQL records).
- [ ] Database Query actions.
- [ ] External Integrations (Webhooks, Email).
# AuctXI – Real-Time Microservices Auction Platform


**AuctXI** is a highly scalable, containerized microservices platform designed to handle live, real-time auctions. It features a robust event-driven architecture that manages real-time bidding, secure wallet-based payments, instant notifications, and integrates an advanced AI-powered assistant for user guidance.

---

## 🚀 Key Features

- **Live Real-Time Bidding:** Powered by WebSockets to ensure sub-second bid latency and real-time dashboard updates for all participants.
- **Secure Payment & Wallet System:** Dedicated integration for deposits, fee deductions, and wallet management using Razorpay.
- **Event-Driven Notifications:** Asynchronous architecture handling in-app alerts and SMTP email notifications without blocking core logic.
- **AI-Powered Assistant:** A built-in LLM assistant utilizing Retrieval-Augmented Generation (RAG) and FAISS vector search to help users navigate rules, platform overview, and account management.
- **Microservices Architecture:** Fully decoupled backend services ensuring fault tolerance, independent scaling, and distinct domain logic.

---

## 🛠 Tech Stack

**Frontend**
- React.js / Vite
- Vanilla CSS / Modern UI/UX

**Backend & Microservices**
- **Core Service:** Java / Spring Boot 
- **API Gateway:** Node.js / Express (Handles routing & JWT Auth)
- **Payment Service:** C# / .NET Core
- **Notification Service:** C# / .NET Core
- **AI Service:** Python / FastAPI (LLM integration, FAISS)

**Infrastructure & Databases**
- **Databases:** MySQL (Primary Data), Redis (AI Session/Memory Caching)
- **Message Broker:** RabbitMQ (Event-driven inter-service communication)
- **Deployment:** Docker, Docker Compose, AWS EC2

---

## 🏗 System Architecture

The backend is composed of **5 distinct microservices** routed through a central API Gateway:

1. **API Gateway (Node.js):** Acts as the single entry point for the frontend, validating JWTs and routing traffic to appropriate downstream services.
2. **Core Service (Java/Spring Boot):** The heart of the platform. Manages auctions, player pools, teams, live websocket bidding, and core entities.
3. **Payment Service (.NET):** Manages client wallets, transactions, and interfaces with the Razorpay API.
4. **Notification Service (.NET):** Consumes RabbitMQ events to dispatch real-time in-app alerts and emails.
5. **AI Service (Python/FastAPI):** Maintains a vectorized knowledge base (FAISS) and connects to LLMs to provide context-aware chat assistance.

---

## ⚙️ Local Setup & Installation

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Vijay-devx/auctxi_aws.git
cd auctxi_aws

⭐ analytics-backend

A scalable, production-ready Website Analytics Platform backend that provides API key management, event collection, and analytics reporting for websites and mobile apps.

🚀 Overview

analytics-backend is a high-performance analytics API that allows client websites or applications to collect user events (e.g., clicks, page visits, device details) and retrieve insights through optimized analytics endpoints.

This system is designed with scalability, speed, and real-world production requirements in mind, including API key authentication, Redis caching, rate limiting, Docker deployment, and thorough documentation.

📌 Features
🔐 API Key Management

Register apps/websites

Generate API keys

Revoke / Regenerate keys

Expiration handling

Google OAuth support for developer onboarding

📊 Event Collection

Collect events like:

Clicks

Page visits

Referrers

Device & user agent data

High-volume ingestion optimized with indexing

📈 Analytics Endpoints

Event summary

Device breakdown

Unique users

Per-user stats & recent events

⚡ Performance & Security

Rate limiting (Redis-backed)

Redis caching for analytics summaries

PostgreSQL optimized schema

Docker containerization

Swagger API documentation

Structured logging

Jest-based tests

🏗️ Tech Stack

Node.js + Express

PostgreSQL (Timescale / partition-ready)

Redis (Caching + Rate limiting)

Docker & Docker Compose

Swagger (OpenAPI)

Jest + Supertest (Testing)

TypeScript

📁 Project Structure
analytics-backend/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── ...
├── docker-compose.yml
├── Dockerfile
├── swagger.yaml
├── tailwind.config.ts
├── tsconfig.json
└── README.md

🗄️ Database Schema (PostgreSQL)
apps
column	type
id	UUID (PK)
name	text
api_key	text (unique)
expires_at	timestamptz
is_revoked	boolean
created_at	timestamptz
events
column	type
id	bigserial
app_id	UUID (FK)
event_name	text
url	text
referrer	text
device	text
ip_address	inet
user_id	text
metadata	jsonb
created_at	timestamptz
🔗 API Endpoints Summary
API Key Management
Method	Endpoint	Description
POST	/api/auth/register	Register app + generate API key
GET	/api/auth/api-key	Get API key for an app
POST	/api/auth/revoke	Revoke API key
Event Collection
Method	Endpoint	Description
POST	/api/analytics/collect	Submit analytics events
Analytics
Method	Endpoint	Description
GET	/api/analytics/event-summary	Event counts + devices + unique users
GET	/api/analytics/user-stats	Stats for a specific user
🧪 Testing

Run the full test suite:

npm test


Tests include:

API key validation

Event ingestion

Analytics queries

Error handling

🐳 Running With Docker
Build & start:
docker-compose up --build


This starts:

app (Node.js server)

PostgreSQL

Redis

🌐 Deployment

This project can be deployed on:

Railway

Render

AWS ECS

Google Cloud Run

Heroku

Your deployed URL will look like:

https://analytics-backend.onrender.com


Add it here when live.

📘 API Documentation

Swagger is available at:

/api/docs

📌 Future Enhancements

Advanced dashboard UI

Real-time streaming (Kafka/EventBridge)

ClickHouse backend for high-volume analytics

Custom user segmentation

Webhooks + alerting system
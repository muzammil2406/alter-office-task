# ⭐ Analytics Backend

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)

**A scalable, production-ready analytics platform for tracking user events and generating insights**

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 🚀 Overview

**analytics-backend** is a high-performance analytics API that enables websites and mobile applications to:
- 📊 Collect user interaction events (clicks, page views, custom events)
- 🔐 Manage API keys with authentication and authorization
- 📈 Generate real-time analytics and insights
- ⚡ Scale to handle high-volume event ingestion

Built with production-grade features including Redis caching, rate limiting, Docker deployment, and comprehensive API documentation.

---

## 📌 Features

### 🔐 API Key Management
- **App Registration** - Register websites/apps and generate secure API keys
- **Key Lifecycle** - Revoke, regenerate, and set expiration dates
- **OAuth Integration** - Google OAuth support for developer authentication
- **Security** - API key validation with rate limiting and abuse prevention

### 📊 Event Collection
Track comprehensive user interaction data:
- **Page Views** - Track visits across your application
- **User Actions** - Clicks, form submissions, custom events
- **Device Intelligence** - Browser, OS, screen resolution
- **Traffic Sources** - Referrers, UTM parameters, campaigns
- **User Context** - IP addresses, geolocation, user IDs
- **Custom Metadata** - Flexible JSONB storage for additional data

### 📈 Analytics & Reporting
- **Event Summaries** - Aggregated event counts by type
- **Device Breakdown** - Browser and OS distribution
- **Unique User Tracking** - DAU/MAU metrics
- **User Journey Analysis** - Per-user event history and statistics
- **Time-Series Data** - Events over time with customizable intervals

### ⚡ Performance & Reliability
- **Redis Caching** - Sub-millisecond response times for analytics queries
- **Rate Limiting** - Prevent API abuse with configurable limits
- **Database Optimization** - Indexed queries and partition-ready schema
- **Horizontal Scaling** - Stateless architecture for easy scaling
- **Structured Logging** - Request tracing and error monitoring
- **Comprehensive Testing** - Jest + Supertest integration tests

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js 18+ |
| **Language** | TypeScript 5.0+ |
| **Framework** | Express.js |
| **Database** | PostgreSQL 15+ (TimescaleDB compatible) |
| **Caching** | Redis 7.0+ |
| **API Docs** | Swagger / OpenAPI 3.0 |
| **Testing** | Jest + Supertest |
| **Deployment** | Docker + Docker Compose |

---

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ or Docker
- PostgreSQL 15+
- Redis 7.0+

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/analytics-backend.git
cd analytics-backend

# Start all services
docker-compose up --build

# API available at http://localhost:3000
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/analytics
# REDIS_URL=redis://localhost:6379

# Run database migrations
npm run migrate

# Start development server
npm run dev

# API available at http://localhost:3000
```

### Verify Installation

```bash
# Health check
curl http://localhost:3000/health

# Response: {"status":"ok","timestamp":"2025-11-13T..."}
```

---

## 📁 Project Structure

```
analytics-backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── authController.ts
│   │   ├── analyticsController.ts
│   │   └── eventsController.ts
│   ├── middlewares/       # Express middlewares
│   │   ├── auth.ts
│   │   ├── rateLimit.ts
│   │   └── validation.ts
│   ├── models/            # Database models
│   │   ├── App.ts
│   │   └── Event.ts
│   ├── services/          # Business logic
│   │   ├── analyticsService.ts
│   │   ├── cacheService.ts
│   │   └── eventService.ts
│   ├── routes/            # API routes
│   ├── utils/             # Helpers and utilities
│   └── app.ts             # Express app setup
├── migrations/            # Database migrations
├── tests/                 # Test suites
├── docker-compose.yml
├── Dockerfile
├── swagger.yaml           # API documentation
└── README.md
```

---

## 🗄️ Database Schema

### `apps` Table
Stores registered applications and their API keys.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Application name |
| `api_key` | TEXT | Unique API key (indexed) |
| `expires_at` | TIMESTAMPTZ | Key expiration date |
| `is_revoked` | BOOLEAN | Revocation status |
| `created_at` | TIMESTAMPTZ | Registration timestamp |

### `events` Table
Stores all analytics events with optimized indexing.

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key |
| `app_id` | UUID | Foreign key to apps |
| `event_name` | TEXT | Event type (click, pageview, etc.) |
| `url` | TEXT | Page URL |
| `referrer` | TEXT | Traffic source |
| `device` | TEXT | User agent string |
| `ip_address` | INET | Client IP address |
| `user_id` | TEXT | Anonymous or authenticated user ID |
| `metadata` | JSONB | Custom event properties |
| `created_at` | TIMESTAMPTZ | Event timestamp (indexed) |

**Indexes:**
- `app_id + created_at` - Time-range queries
- `app_id + event_name` - Event type filtering
- `app_id + user_id` - User journey tracking
- `metadata` (GIN) - JSONB queries

---

## 🔗 API Reference

### Authentication
All analytics endpoints require an `X-API-Key` header:

```bash
curl -H "X-API-Key: your_api_key_here" \
  https://api.example.com/api/analytics/event-summary
```

### API Key Management

#### Register Application
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "My Website",
  "domain": "https://example.com"
}
```

**Response:**
```json
{
  "appId": "550e8400-e29b-41d4-a716-446655440000",
  "apiKey": "ak_live_1234567890abcdef",
  "expiresAt": "2026-11-13T00:00:00Z"
}
```

#### Revoke API Key
```http
POST /api/auth/revoke
Content-Type: application/json

{
  "apiKey": "ak_live_1234567890abcdef"
}
```

### Event Collection

#### Submit Events
```http
POST /api/analytics/collect
X-API-Key: your_api_key
Content-Type: application/json

{
  "eventName": "page_view",
  "url": "https://example.com/products",
  "referrer": "https://google.com",
  "userId": "user_123",
  "metadata": {
    "category": "electronics",
    "price": 299.99
  }
}
```

**Batch Events:**
```json
{
  "events": [
    { "eventName": "click", "url": "/button", ... },
    { "eventName": "page_view", "url": "/home", ... }
  ]
}
```

### Analytics Queries

#### Event Summary
```http
GET /api/analytics/event-summary?startDate=2025-11-01&endDate=2025-11-13
X-API-Key: your_api_key
```

**Response:**
```json
{
  "totalEvents": 15420,
  "uniqueUsers": 3241,
  "eventBreakdown": {
    "page_view": 8932,
    "click": 4201,
    "form_submit": 2287
  },
  "deviceBreakdown": {
    "desktop": 9234,
    "mobile": 5186,
    "tablet": 1000
  },
  "cached": true,
  "generatedAt": "2025-11-13T10:30:00Z"
}
```

#### User Statistics
```http
GET /api/analytics/user-stats?userId=user_123
X-API-Key: your_api_key
```

**Response:**
```json
{
  "userId": "user_123",
  "totalEvents": 47,
  "firstSeen": "2025-11-01T08:23:10Z",
  "lastSeen": "2025-11-13T09:45:32Z",
  "recentEvents": [
    {
      "eventName": "purchase",
      "url": "/checkout",
      "timestamp": "2025-11-13T09:45:32Z",
      "metadata": { "amount": 49.99 }
    }
  ]
}
```

---

## 🧪 Testing

Run the full test suite:

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Specific test file
npm test -- auth.test.ts
```

**Test Coverage:**
- ✅ API key generation and validation
- ✅ Event ingestion and storage
- ✅ Analytics query accuracy
- ✅ Rate limiting behavior
- ✅ Cache invalidation
- ✅ Error handling and edge cases

---

## 🐳 Docker Deployment

### Production Build

```bash
# Build optimized image
docker build -t analytics-backend:latest .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  -e NODE_ENV=production \
  analytics-backend:latest
```

### Docker Compose (Full Stack)

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/analytics
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 🌐 Deployment

### Supported Platforms

| Platform | Deployment Guide |
|----------|-----------------|
| **Railway** | [Deploy to Railway](https://railway.app) - One-click deployment |
| **Render** | [Deploy to Render](https://render.com) - Auto-deploy from GitHub |
| **AWS ECS** | Fargate with RDS & ElastiCache |
| **Google Cloud Run** | Serverless with Cloud SQL |
| **DigitalOcean** | App Platform or Droplet |

### Environment Variables

```env
# Server
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Redis
REDIS_URL=redis://host:6379

# Security
JWT_SECRET=your_jwt_secret
API_KEY_PREFIX=ak_live_

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100

# Caching
CACHE_TTL=300
```

---

## 📊 Performance Benchmarks

| Metric | Value |
|--------|-------|
| **Event Ingestion** | ~5,000 req/sec (single instance) |
| **Analytics Query (cached)** | <10ms p95 |
| **Analytics Query (uncached)** | <200ms p95 |
| **Database Connections** | Pool of 20 |
| **Memory Usage** | ~150MB baseline |

---

## 🔒 Security

- ✅ API key authentication on all endpoints
- ✅ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Environment-based secrets management

---

## 📘 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:3000/api/docs
```

Features:
- Try API calls directly from browser
- Request/response examples
- Schema definitions
- Authentication testing

---

## 🛣️ Roadmap

### Planned Features
- [ ] **Dashboard UI** - React-based analytics dashboard
- [ ] **Real-time Streaming** - WebSocket support for live data
- [ ] **Advanced Segmentation** - Custom user cohorts and filters
- [ ] **Funnel Analysis** - Conversion tracking and drop-off rates
- [ ] **A/B Testing** - Experiment tracking and statistical analysis
- [ ] **Alerting System** - Webhooks for threshold-based notifications
- [ ] **Data Export** - CSV/JSON export for external analysis
- [ ] **Multi-tenancy** - Organization and team management

### Performance Enhancements
- [ ] ClickHouse integration for petabyte-scale analytics
- [ ] Apache Kafka for event streaming
- [ ] GraphQL API alternative
- [ ] TimescaleDB hypertables for time-series optimization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with:
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

<div align="center">

**[⬆ Back to Top](#-analytics-backend)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>

# Lead Generation & Enrichment Pipeline

## Overview

This project is a backend pipeline designed to **discover, enrich, store, and manage business leads** using multiple external APIs and automation workflows.

The system focuses on:

* Collecting leads from various sources (e.g. Google Maps queries)
* Enriching lead data using third-party APIs
* Validating contact information (emails, phone numbers)
* Storing structured lead data in a database
* Managing outreach lifecycle (e.g. raw → sent → failed)

---

## Architecture

The project follows a modular backend structure:

```
config/        → API clients and external services
storage/       → Database access layer (Supabase)
pipeline/      → Lead processing logic (scraping, enrichment, etc.)
utils/         → Helper functions (normalization, formatting, etc.)
```

---

## Core Features

### 1. Lead Collection

* Uses query-based search (e.g. Google Maps)
* Supports multiple business segments (SMEs, hospitals, estates, etc.)

### 2. Data Enrichment

* Integrates with external APIs:

  * Apollo (person/company enrichment)
  * Hunter (email discovery)
  * ZeroBounce (email validation)

### 3. Data Storage

* Supabase (PostgreSQL) used as the primary database
* Structured schema with:

  * contact details
  * location data
  * enrichment fields
  * outreach tracking

### 4. Outreach Tracking

Leads move through states:

* `raw`
* `sent`
* `failed`

---

## Tech Stack

* **Node.js (ES Modules)**
* **Supabase** (Database)
* **Fetch API** (for REST integrations)
* **Resend** (email service)
* **Upstash Redis** (job queue)
* **Logtail** (logging)
* **Sentry** (error monitoring)

---

## Key Concepts Used

* async/await for asynchronous workflows
* Promise.allSettled for resilient API calls
* ES Modules (import/export syntax)
* Destructuring & spread operators for data handling

---

## Setup

### 1. Install dependencies

```
npm install
```

### 2. Create `.env` file

```
SUPABASE_URL=
SUPABASE_KEY=
GOOGLE_MAPS_API_KEY=
APOLLO_API_KEY=
HUNTER_API_KEY=
ZEROBOUNCE_API_KEY=
RESEND_API_KEY=
UPSTASH_REDIS_TOKEN=
LOGTAIL_SOURCE_TOKEN=
SENTRY_DSN=
```

### 3. Run project

```
node index.js
```

---

## Database Layer

The project uses a repository pattern:

* `insertLead()` → insert new leads
* `upsertLead()` → deduplicate and update
* `getLeadByStatus()` → fetch leads by pipeline stage
* `markSent()` → update outreach status
* `markFailed()` → track failures

---

## Logging & Error Handling

* All operations are wrapped in `try/catch`
* Structured logging via Logtail
* Errors tracked with Sentry

---

## Project Goal

To build a **scalable, automated lead generation system** that can:

* handle multiple data sources
* tolerate API failures
* maintain clean and structured data
* support outreach workflows

---

## Future Improvements

* Add retry logic for failed API calls
* Implement rate limiting
* Add batch processing for large datasets
* Build dashboard for lead analytics
* Integrate scheduling for automated runs

---

## Author

Built as part of a backend engineering project focused on real-world data pipelines and API integrations.

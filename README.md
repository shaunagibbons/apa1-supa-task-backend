# APA1 Supa Task Backend

# Overview
This code is a Deno-based HTTP server that interacts with a Supabase backend to manage a list of "fish". The server supports various HTTP request methods (GET, POST, PUT, DELETE) to perform CRUD operations on a Supabase table called fish. It provides a RESTful API to manage fish records, where each record contains details like Name, Sell, Shadow, and Where.

# Key Features
GET: Fetches all fish records from the Supabase database, ordered by the Name field in ascending order.
POST: Adds a new fish record to the database.
PUT: Updates an existing fish record by its unique Id.
DELETE: Deletes a fish record based on the provided Id.
Each of these operations validates input, handles errors, and returns appropriate responses in JSON format.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [curl](https://curl.se/) for testing functions locally

## Getting Started

Before starting with this project please set up an account with [Supabase](https://supabase.com/)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

`npm install`

**Very important, if you are working on your project in cloud spaces prefix all your supabase commands with `npx`**

### 3. Authenticate with Supabase
The first step is to authenticate with Supabase:

```bash
supabase login
```

This will open a browser window where you can authenticate with Supabase and generate an access token.

### 4. Link

Once authenticated, link your local project to your Supabase project:

```bash
supabase link --project-ref your_project_id
```

### 5. Working with Edge Functions

**Creating a New Edge Function**

```bash
supabase functions new my-function-name
```

This creates a new function in supabase/functions/my-function-name/

**Deploying your Edge functions**

```bash
supabase functions deploy
```

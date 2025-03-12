# APA1 Supa Task Backend

# Overview
This code is a Deno-based HTTP server that interacts with a Supabase backend to manage a list of "fish". The server supports various HTTP request methods (GET, POST, PUT, DELETE) to perform CRUD operations on a Supabase table called fish. It provides a RESTful API to manage fish records, where each record contains details like Name, Sell, Shadow, and Where.

# Key Features
GET: Fetches all fish records from the Supabase database, ordered by the Name field in ascending order.
POST: Adds a new fish record to the database.
PUT: Updates an existing fish record by its unique Id.
DELETE: Deletes a fish record based on the provided Id.
Each of these operations validates input, handles errors, and returns appropriate responses in JSON format.

# Debugging

GET request:
Log Entry: Every time a GET request is made, the server logs that it has received the request.
Log Data: The data fetched from the Supabase database is logged for verification.
Error Logging: If there’s an issue fetching data, the error is logged with a detailed message to aid debugging.

POST request:
Log Entry: When a POST request is received, the request body (which contains the fish data) is logged.
Log Validation: A warning is logged if any required fields are missing in the request body.
Error Logging: If the insertion into the database fails, the error is logged, providing details to help identify the problem.
Success Logging: If the fish is successfully added, a success message is logged.

PUT request:
Log Entry: The PUT request is logged, and the request body is printed to verify the data.
Log Validation: A warning is logged if any required fields are missing.
Error Logging: If the update operation fails, the error is logged with detailed information.
Success Logging: A success message is logged if the fish is updated successfully.

DELETE Request:
Log Entry: The DELETE request is logged, and the body of the request is printed.
Log Validation: A warning is logged if the ID is missing.
Error Logging: If the deletion fails, the error is logged.
Success Logging: A success message is logged when the fish is deleted successfully.

Handling unsupported HTTP method:
If an unsupported HTTP method is encountered, it is logged as a warning to indicate an invalid request.
The server responds with a 405 status code and a "Method not allowed" message.

Error handling and server errors:
Any unhandled errors that occur during the request lifecycle are caught and logged as server-side errors.
The response contains the error message, and a 500 status code is returned.

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

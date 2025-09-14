# WebSocket + Express Example

This project demonstrates how to create a **WebSocket server** integrated with an **Express API**.  
It includes token-based authentication, CORS validation, and a simple `/login` endpoint.

---

## Features

- **Express server** with:
  - `helmet` for basic security.
  - `cors` with configurable origin.
  - `morgan` for request logging.
  - `/login` route that returns a fixed token (`123456`).

- **WebSocket server** with:
  - `onConnection`, `onMessage`, and `onError` event handlers.
  - Broadcast function to send messages to all connected clients.
  - Token-based connection verification (`verifyClient`).
  - Basic CORS validation for WebSocket connections.

---

## Installation

```bash
git clone <repo-url>
cd <project-folder>
npm install
````

---

## Running the server

Create a `.env` file to configure CORS (optional):

```env
CORS_ORIGIN=*
```

Then run:

```bash
node server.js
```

---

## API

### `POST /login`

Returns a static token.

**Response:**

```json
{
  "token": "123456"
}
```

---

## WebSocket

* Connect using a client that passes the token in the query string:

  ```
  ws://localhost:<port>/?token=123456
  ```

* On each message received, the server will:

  * Echo the message back.
  * Send `"recebido"` as confirmation.

---

## Broadcast Example

To broadcast a message to all connected clients:

```
wss.broadcast({ type: "notification", message: "Hello everyone!" });
```

---

## Dependencies

* [express](https://www.npmjs.com/package/express)
* [ws](https://www.npmjs.com/package/ws)
* [helmet](https://www.npmjs.com/package/helmet)
* [cors](https://www.npmjs.com/package/cors)
* [morgan](https://www.npmjs.com/package/morgan)


Do you want me to also include a **minimal usage example** (e.g., how to connect with a WebSocket client in Node.js or browser) in the README?
```

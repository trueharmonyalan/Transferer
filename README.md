# Transferer

**Transferer** is a browser-based, peer-to-peer file sharing application built on [WebRTC](https://webrtc.org/). It lets you share files directly between browsers without uploading them to a third-party server — your files travel straight from one device to another.

---

## How it works

1. **Create a room** – One user requests a new room from the signaling server, which generates a short, cryptographically-random key and stores it in a local SQLite database.
2. **Share the key** – The key is given to the person you want to transfer files with.
3. **Join the room** – The other user submits the key to the signaling server, which validates it and returns the connection details needed to establish a WebRTC session.
4. **Transfer files** – Once both peers are connected, files are streamed directly between the two browsers via a WebRTC data channel — the server is no longer involved.

---

## Architecture

```
┌─────────────────────────────────────────┐
│           Client  (React + Vite)        │
│  browser UI · WebRTC data channel       │
└──────────────────┬──────────────────────┘
                   │ HTTP
┌──────────────────▼──────────────────────┐
│    Signaling Server (Express + TypeScript)  │
│  POST /create/key  ·  POST /join/key    │
└──────────┬───────────────────┬──────────┘
           │                   │
    ┌──────▼──────┐   ┌────────▼────────┐
    │   shared/   │   │  packages/db/   │
    │  TS types   │   │  SQLite (WAL)   │
    └─────────────┘   └─────────────────┘
```

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7 |
| Backend | Express 5, Node.js, TypeScript 5 |
| Database | SQLite via `better-sqlite3` (WAL mode) |
| P2P transport | WebRTC data channel |
| Crypto | `webcrypto.getRandomValues` for key generation |

---

## Project structure

```
Transferer/
├── client/            # React web app (Vite)
├── signalingServer/   # Express signaling server
│   └── src/
│       ├── routes/        # /create and /join endpoints
│       ├── controllers/   # Request handlers
│       ├── services/      # Key generation & validation
│       └── lib/           # Utilities (logger, key generator, …)
├── packages/
│   └── db/            # SQLite wrapper & migrations
├── shared/            # TypeScript interfaces shared by client & server
├── package.json       # Root workspace / dev scripts
└── tsconfig.json
```

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
# Root (signaling server)
npm install

# Client
cd client && npm install
```

### Run in development

```bash
# Start the signaling server (hot-reload via nodemon)
npm run dev

# In a separate terminal — start the client dev server
cd client && npm run dev
```

---

## License

[MIT](LICENSE) © Alan Biju

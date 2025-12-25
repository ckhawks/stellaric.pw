# Internal API - Quick Context

## Stack
- Express.js + TypeScript (ts-node for dev, tsc build to dist/)
- Axios for external HTTP calls
- Dotenv for config

## Current Features
- Philips Hue light control API (RGB/HSB conversion, brightness, etc.)
- API key authentication (X-API-Key header)

## Project Layout
- `server.ts` — Main Express app with all routes
- `.env.example` — Required env vars template
- `docker-compose.yml` + `Dockerfile` — Docker setup

## Required Environment Variables
```
API_KEY=<secret-key>
HUE_BRIDGE_IP=<ip-address>
HUE_USERNAME=<hue-bridge-username>
DEFAULT_LIGHT_ID=<light-id> (defaults to 2)
PORT=<port> (defaults to 3000)
```

## Running
- **Dev**: `npm run dev` (ts-node server.ts, hot reload)
- **Build**: `npm run build` (tsc → dist/)
- **Prod**: `npm start` (node dist/server.js)
- **Docker**: `docker-compose up`

## Before Starting
- All routes require valid API_KEY in headers
- Hue endpoints assume Hue Bridge already set up and accessible
- Plan for: activity system, metrics tracking, user data, scheduled tasks
- Consider adding database connector (PostgreSQL likely) when scaling

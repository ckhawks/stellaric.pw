# Stellaric.pw - Personal Website

A personal website built with Next.js, featuring music, projects, and interactive content.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Backend**: Internal API (Node.js)
- **UI Components**: Radix UI, shadcn/ui patterns
- **Animations**: tsParticles, Tailwind Animate
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

## Project Structure

```
├── nextjs/          # Frontend application
├── internal-api/    # Backend API
└── README.md        # This file
```

## Completed Features

- ✅ Homepage look & feel with navigation
- ✅ About page summary
- ✅ Base layout and design system
- ✅ DJ sets page with content
- ✅ Projects page with content
- ✅ Light control system on homepage
- ✅ Custom color picker
- ✅ FPS counter and performance optimization

## Development

### Setup

```bash
cd nextjs
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
npm run build
npm run start
```

## Todo List

### Content
- Add photography content
- Link to real photography portfolio
- Add gear/equipment content

### Frontend/UI
- Remove links page or replace with "Built With/Inspiration" page
- Add rotating cat ASCII art to footer
- Create activities page component
- Add mini activities section to homepage
- Add reaction system to activity posts (likes, fire reacts, etc.)
- Create "What's Overhead Right Now" dashboard (ISS position, visible satellites, planets visible, regional aircraft activity, real-time space weather)
- Create "Upcoming Events" calendar (auroras, solar flares, meteor showers, geomagnetic storms)
- Create fog forecast dashboard
- Create ping testing dashboard (latency to different cities via Toaster's Rink nodes)
- Create base live metrics display system
- Improve metrics page look and presentation
- Create metrics dashboard with real-time data visualization

### Backend
- Set up database schema for activities (timestamp, category, content)
- Create API endpoints for activity CRUD operations
- Add reaction endpoints (POST/GET reactions for activities)
- Integrate astronomy API for space data (planets, meteor showers, notable stars, ISS tracking)
- Integrate satellite tracking API (visible satellites pass predictions)
- Integrate aircraft tracking API (regional airspace activity - obfuscated location)
- Integrate weather API for fog forecasting
- Integrate space weather API (aurora forecasts, solar flare alerts, geomagnetic storm data)
- Set up ping testing to Toaster's Rink nodes in different cities (latency monitoring)
- Set up analytics data collection infrastructure
- Add mouse and keypress data tracking (desktop/laptop)
- Implement additional metric types beyond base metrics
- Create scheduled data aggregation/processing

### Admin Panel
- Build admin interface to add/edit activities with datetime and category selection
- Add authentication and authorization

### External API Integrations
- Set up Google Sheets API integration
- Implement dual-way sync between website broadcasts and Google Sheet
- Create scheduled sync logic

### 3D/Advanced
- Add 3D models
- Create/improve 3D model renderer
- Integrate 3D content into site

## Notes

- The internal-api directory contains the backend that will power features like the activity system and metrics
- Consider database setup (likely PostgreSQL or similar) before implementing activity system and analytics
- Admin panel will need authentication and authorization

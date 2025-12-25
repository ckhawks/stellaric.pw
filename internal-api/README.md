# Internal API - Home Network Data Capture

A local Express API that runs on your home network to capture, aggregate, and proxy personal data to the main website backend.

## Purpose

This API serves as the bridge between your personal devices and the main Nextjs site. It captures various data points from your home environment and devices, stores them, and makes them available for visualization and analysis on stellaric.pw.

## Current Features

- Philips Hue light control (RGB/HSB conversion, brightness, color temperature)
- API key authentication

## Data Capture Vision

### Applications & Activity Tracking
- [ ] List of applications currently open on MacBook
- [ ] List of applications currently open on Desktop
- [ ] Active application logging (what you're using moment-to-moment)

### Network Monitoring
- [ ] Network speed tests (download/upload) run periodically
- [ ] Latency measurements
- [ ] Connection stability tracking

### Input Tracking
- [ ] Mouse click logging and storage
- [ ] Mouse movement tracking
- [ ] Keyboard press logging (privacy-conscious implementation)
- [ ] Input activity patterns and heatmaps

### Environmental Sensors
- [ ] Apartment temperature readings
- [ ] Air quality metrics (CO2, particulates, humidity)
- [ ] Sensor integration for smart home data

## Tech Stack

- Express.js + TypeScript
- Dotenv for configuration
- Axios for HTTP calls to external services

## Getting Started

See `CLAUDE.md` for development setup and running instructions.

## Architecture Notes

- All routes require API key authentication
- Data should be timestamped and stored with context (device, location, etc.)
- Plan to add database layer (PostgreSQL) for persistent storage
- May need separate client agents running on MacBook/Desktop to report back to API

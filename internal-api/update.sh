#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "Pulling latest changes..."
git pull

echo "Rebuilding and restarting container..."
docker compose up --build -d

echo "Cleaning up old images..."
docker image prune -f

echo "Done! Container status:"
docker compose ps

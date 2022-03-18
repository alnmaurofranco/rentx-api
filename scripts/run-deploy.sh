#!/bin/sh
echo "🎇 Starting deploy to production..."
(yarn && docker-compose up -d db redis)
(cp .env.example .env && cp .env.production.example .env.production)
(rm -rf .env.example .env.production.example)
(yarn db:migrate:deploy && yarn start:prod)

#!/bin/sh
(yarn && docker-compose up -d db redis)
(yarn db:migrate:deploy)
(cp .env.example .env && cp .env.production.example .env.production)
(rm -rf .env.example .env.production.example)

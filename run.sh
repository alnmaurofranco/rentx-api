#!/bin/sh
# (cp .env.example .env && docker-compose up -d)
#(cp .env.example .env && cp .env.production.example .env.production)
(docker-compose up -d db && yarn start:prod)

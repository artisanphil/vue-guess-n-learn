## Guess N Learn, Vue Frontend

This games is based on Guess Who, but for language learning.

There will be 3 quiz modes:

- multiple choice (random from all questions)
- fill in the blank
- jumbled sentence

## Technologies:

Laravel API

Nginx

Vue JS with Typescript

Tailwind

## Installation

Download the backend code (in private repository) and run in Docker

Go to vue folder in the terminal and run the following commands:

`cp .env.example .env`

`npm install`

`npm run serve`

go to http://localhost:8080

## Docker (for production)

`cp .env.example .env`

`docker build . -t vue-guess-n-learn`

`docker run -d -p 8080:80 vue-guess-n-learn`

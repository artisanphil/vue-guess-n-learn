## Ask Lingua, Vue Frontend

This games is based on Guess Who, but for language learning.

![Overview](/public/images/screenshots/home.png)

There are 3 quiz modes:

- multiple choice (random from all questions)
- fill in the blank
- jumbled sentence

## Technologies:

Laravel API

Nginx

Vue JS with Typescript

Tailwind

## Installation

Download the [backend code](https://github.com/artisanphil/guess-n-learn) and run in Docker

Come back to this project and in the terminal run the following commands:

`cp .env.example .env`

`npm install`

`npm run serve`

go to http://localhost:8080

## Docker (for production)

`cp .env.example .env`

`docker build . -t vue-guess-n-learn`

`docker run -d -p 8080:80 vue-guess-n-learn`

## Screenshots

![Lingua's turn](/public/images/screenshots/lingua-guess.png)

![Pick attribute](/public/images/screenshots/pick-object.png)

![Multipe choice question](/public/images/screenshots/multiple-choice-question.png)

![Remaining characters](/public/images/screenshots/remaining-characters.png)

![Click words](/public/images/screenshots/click-words.png)
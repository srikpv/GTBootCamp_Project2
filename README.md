mkdir Project2

cd Project2

git clone https://github.com/srikpv/GTBootCamp_Project2

cd app

mkdir config 

cd config

touch .env file

Add the following items

DATABASE=dream11

USER_NAME=

PASS_WORD=

HOST=127.0.0.1

DIALECT=mysql

DB_PORT=3306

NODE_ENV=development


npm i


CREATE DATABASE `dream11`;


cd app/db

knex migrate:latest

knex seed:run

npm start

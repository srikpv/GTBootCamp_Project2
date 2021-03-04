Clone Project
-------------------------------
mkdir Project2

cd Project2

git clone https://github.com/srikpv/GTBootCamp_Project2

Create .env file
-------------------------------
cd app

mkdir config 

cd config

create .env file and add the following items (add values to USER_NAME and PASS_WORD)
-------------------------------
DATABASE=dream11

USER_NAME=

PASS_WORD=

HOST=127.0.0.1

DIALECT=mysql

DB_PORT=3306

NODE_ENV=development

Install packages
-------------------------------
Go back to app directory
npm i
npm i --global knex

Create DB in MySQL
-------------------------------
Run this in mySQL bench
CREATE DATABASE `dream11`;

Seed and Migrations
-------------------------------
cd app/db

knex migrate:latest

knex seed:run

Start project
-------------------------------
Go back to app directory
npm start

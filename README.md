# ANONYME-GRUPPE3-ABGABE

There are a few steps necessary to start the application.

### SETUP DATABASE

```
docker pull postgres
```
```
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

### CREATE TABLES IN PUBLIC SCHEMA

```
create table users
(
	users_pk serial not null
		constraint users_pk
			primary key,
	name varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null,
	score integer
);

alter table users owner to postgres;

create unique index users_email_uindex
	on users (email);

create unique index users_name_uindex
	on users (name);

create unique index users_users_pk_uindex
	on users (users_pk);

create table actions
(
	actions_pk serial not null
		constraint actions_pk
			primary key,
	message varchar not null
);

alter table actions owner to postgres;

create unique index actions_actions_pk_uindex
	on actions (actions_pk);

create unique index actions_message_uindex
	on actions (message);
  
```

### INSERT DATA INTO ACTIONS TABLE
Now you need to fill the database with information. Prior to the start of the app we only need the following information in our database.

```
INSERT INTO public.actions (actions_pk, message) VALUES (1, 'Stop it!'); INSERT INTO public.actions (actions_pk, message) VALUES (2, 'Nobody likes you!'); INSERT INTO public.actions (actions_pk, message) VALUES (3, 'You are dumb!'); INSERT INTO public.actions (actions_pk, message) VALUES (4, 'Get los, fool!'); INSERT INTO public.actions (actions_pk, message) VALUES (5, 'I know martial arts!'); INSERT INTO public.actions (actions_pk, message) VALUES (6, 'Please dont hurt me!');

```

### STARTING THE APP 

```
npm run start 

```

### PLAYING THE GAME 
Last thing to do is to open the browser and go to localhost:3000 and play the game.

- This app has been optimized for smartphones, due to the concept of the game.
Therefore we suggest using the browser tools to simulate a smartphone. (no CSS files in this version)

- Login: the email must exist (register first) + the password has to be at least 6 chars

- After Login: loop throught opponents (click 'Start Game') with Thumbs Up and Down

- Thumbs Up: display the opponents name and score + three random action massages to choose 

- Delete displayed action message after click

... no more features :(








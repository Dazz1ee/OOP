CREATE TABLE users(
    id serial,
    email varchar(60) NOT NULL,
    username varchar(60) NOT NULL,
    password varchar(60) NOT NULL ,
    avatar TEXT,
    CONSTRAINT uniq_email UNIQUE (email),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id serial,
    name varchar(60) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE user_role (
    user_id serial,
    role_id serial,
    CONSTRAINT user_fk FOREIGN KEY (user_id) references users(id),
    CONSTRAINT role_fk FOREIGN KEY (role_id) references roles(id)
);

INSERT INTO roles (name) values ('ROLE_ADMIN'), ('ROLE_USER');

CREATE TABLE posts(
                      id serial,
                      text1 TEXT,
                      text2 TEXT,
                      text3 TEXT,
                      text4 TEXT,
                      text5 TEXT,

                      CONSTRAINT user_post FOREIGN KEY (id) references users(id)
);
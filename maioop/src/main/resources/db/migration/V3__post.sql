CREATE TABLE posts(
     id serial,
     text1 TEXT,
     text2 TEXT,
     text3 TEXT,
     text4 TEXT,
     text5 TEXT,

     CONSTRAINT user_post FOREIGN KEY (id) references users(id)
);

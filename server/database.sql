CREATE DATABASE colors;

CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    hex_code VARCHAR(10) UNIQUE NOT NULL,
    is_fav BOOLEAN NOT NULL 
);

-- adding colors in the database

INSERT INTO colors (name, hex_code, is_fav) 
VALUES (value1, value2, value3);

-- getting all the colors stored in the database

SELECT * FROM colors;

-- Updating the colors table for favourite colors

UPDATE colors 
SET is_fav = TRUE
WHERE color_id IN (1, 3, 5, 2, 10);

-- create users table

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Example Users

INSERT INTO users (user_name, user_email, user_password) 
VALUES ('KiritoKun007', 'ashish.ashish870@gmail.com', 'WhereDidTheCatDraggedItFrom');
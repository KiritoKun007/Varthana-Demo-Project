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
    user_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
);

-- Example Users

INSERT INTO users (user_name, user_email, user_password) 
VALUES ('KiritoKun007', 'ashish.ashish870@gmail.com', 'WhereDidTheCatDraggedItFrom');

-- user and color relationship table

CREATE TABLE favColor(
    user_id uuid NOT NULL,
    color_id INT NOT NULL,
    FOREIGN KEY (color_id) REFERENCES colors(color_id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (user_id, color_id)
);

-- insert fav color

insert into favcolor (user_id, color_id) values ('e54de848-4d6b-4a82-bbcb-6c4ff31c6da6', 5), ('e54de848-4d6b-4a82-bbcb-6c4ff31c6da6', 9);
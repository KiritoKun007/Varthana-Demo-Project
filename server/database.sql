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
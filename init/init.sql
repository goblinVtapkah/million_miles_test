CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    images TEXT[],
    name TEXT,
    year TEXT,
    mileage INTEGER,
    engine INTEGER,
    price INTEGER
);

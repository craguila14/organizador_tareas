CREATE database organizador;

\c organizador;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  titulo VARCHAR(150) NOT NULL,
  posicion INTEGER NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  posicion INTEGER NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

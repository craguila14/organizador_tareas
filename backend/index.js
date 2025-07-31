import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/organizadorRoutes.js';
import pkg from 'pg'

dotenv.config();

const { Client } = pkg;

const app = express();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});



const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
;

// Rutas
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
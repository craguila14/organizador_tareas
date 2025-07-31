import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/organizadorRoutes.js';
import pkg from 'pg'

dotenv.config();

const { Client } = pkg;

const app = express();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
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
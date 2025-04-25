import pool from '../config/db.js'

const createUser = async (nombre, email, password) => {
    try {

      const query = 'INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [nombre, email, password];
      const result = await pool.query(query, values);
      
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al obtener usuario por email:', error.message);
        throw error; 

    }
};

export const userModel = {
    createUser,
    getUserByEmail,
}
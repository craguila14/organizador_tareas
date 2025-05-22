import pool from "../config/db.js";

const getBoardsByUser = async (userId) => {
  const query = `
    SELECT * FROM boards
    WHERE user_id = $1
    ORDER BY creado_en DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getBoardById = async (id) => {
  const query = `
    SELECT * FROM boards
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const createBoard = async (userId, titulo) => {
  const query = `
    INSERT INTO boards (user_id, titulo)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, titulo]);
  return result.rows[0];
};

const updateBoard = async (id, titulo) => {
  const query = `
    UPDATE boards
    SET titulo = $1
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, id]);
  return result.rows[0];
};

const deleteBoard = async (id) => {
  const query = `
    DELETE FROM boards
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};

export const boardsModel = {
  getBoardsByUser,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};

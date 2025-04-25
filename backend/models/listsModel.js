import pool from "../config/db.js";

const getListsByBoardId = async (boardId) => {
  const query = `
    SELECT * FROM lists
    WHERE board_id = $1
    ORDER BY posicion ASC;
  `;
  const result = await pool.query(query, [boardId]);
  return result.rows;
};


const createList = async (boardId, titulo, posicion) => {
  const query = `
    INSERT INTO lists (board_id, titulo, posicion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [boardId, titulo, posicion]);
  return result.rows[0];
};


const updateList = async (id, titulo, posicion) => {
  const query = `
    UPDATE lists
    SET titulo = $1, posicion = $2
    WHERE id = $3
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, posicion, id]);
  return result.rows[0];
};


const deleteList = async (id) => {
  const query = `
    DELETE FROM lists
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};

export const listsModel = {
  getListsByBoardId,
  createList,
  updateList,
  deleteList,
};

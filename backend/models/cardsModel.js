import pool from "../config/db.js";


const getCardsByListId = async (listId) => {
  const query = `
    SELECT * FROM cards
    WHERE list_id = $1
    ORDER BY posicion ASC;
  `;
  const result = await pool.query(query, [listId]);
  return result.rows;
};


const createCard = async (listId, titulo, descripcion, posicion) => {
  const query = `
    INSERT INTO cards (list_id, titulo, descripcion, posicion)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [listId, titulo, descripcion, posicion]);
  return result.rows[0];
};


const updateCard = async (id, titulo, descripcion, posicion, listId) => {
  const query = `
    UPDATE cards
    SET titulo = $1, descripcion = $2, posicion = $3, list_id = $4
    WHERE id = $5
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, descripcion, posicion, listId, id]);
  return result.rows[0];
};


const deleteCard = async (id) => {
  const query = `
    DELETE FROM cards
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};

export const cardsModel = {
  getCardsByListId,
  createCard,
  updateCard,
  deleteCard,
};

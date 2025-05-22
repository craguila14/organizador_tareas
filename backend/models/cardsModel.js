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


const createCard = async (list_id, titulo, posicion, estado) => {
  const query = `
    INSERT INTO cards (list_id, titulo, posicion, estado)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [list_id, titulo, posicion, estado]);
  return result.rows[0];
};


const updateCard = async (id, titulo, posicion, list_id, estado) => {
  const query = `
    UPDATE cards
    SET titulo = $1, posicion = $2, list_id = $3, estado = $4
    WHERE id = $5
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, Number(posicion), list_id, estado, id]); 
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

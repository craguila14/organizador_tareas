import { cardsModel } from "../models/cardsModel.js";

const getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await cardsModel.getCardsByListId(listId);
    res.json(cards);
  } catch (error) {
    console.error('Error al obtener las tarjetas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const createCard = async (req, res) => {
  try {
    const { listId } = req.params;
    const { titulo, posicion, estado } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newCard = await cardsModel.createCard(listId, titulo, posicion, estado);
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error al crear la tarjeta:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, posicion, listId, estado } = req.body;

    const updatedCard = await cardsModel.updateCard(id, titulo, Number(posicion), listId, estado);
    if (!updatedCard) {
      return res.status(404).json({ message: 'Tarjeta no encontrada' });
    }

    res.json(updatedCard);
  } catch (error) {
    console.error('Error al actualizar la tarjeta:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    await cardsModel.deleteCard(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la tarjeta:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const cardsController = {
  getCardsByList,
  createCard,
  updateCard,
  deleteCard,
};

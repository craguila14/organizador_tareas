import { listsModel } from '../models/listsModel.js';

const getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await listsModel.getListsByBoardId(boardId);
    res.json(lists);
  } catch (error) {
    console.error('Error al obtener las listas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const createList = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { titulo, posicion } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newList = await listsModel.createList(boardId, titulo, posicion);
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error al crear la lista:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, posicion } = req.body;

    const updatedList = await listsModel.updateList(id, titulo, posicion);
    if (!updatedList) {
      return res.status(404).json({ message: 'Lista no encontrada' });
    }

    res.json(updatedList);
  } catch (error) {
    console.error('Error al actualizar la lista:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await listsModel.deleteList(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la lista:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const listsController = {
  getListsByBoard,
  createList,
  updateList,
  deleteList,
};

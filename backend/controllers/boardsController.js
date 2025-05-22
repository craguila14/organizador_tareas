import { boardsModel } from '../models/boardsModel.js';

const getBoardsByUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const boards = await boardsModel.getBoardsByUser(userId);
    res.json(boards);
  } catch (error) {
    console.error('Error al obtener los tableros:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await boardsModel.getBoardById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'Tablero no encontrado' });
    }
    res.json(board);
  } catch (error) {
    console.error('Error al obtener el tablero:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const createBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newBoard = await boardsModel.createBoard(userId, titulo);
    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error al crear el tablero:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { titulo } = req.body;
    const updatedBoard = await boardsModel.updateBoard(req.params.id, titulo);

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Tablero no encontrado' });
    }

    res.json(updatedBoard);
  } catch (error) {
    console.error('Error al actualizar el tablero:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const deleteBoard = async (req, res) => {
  try {
    await boardsModel.deleteBoard(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el tablero:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const boardsController = {
  getBoardsByUser,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};

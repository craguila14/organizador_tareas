import express from 'express'
import { userController } from '../controllers/userController.js'
import { boardsController } from '../controllers/boardsController.js'
import { listsController } from '../controllers/listsController.js'
import { cardsController } from '../controllers/cardsController.js'
import { middleware } from '../middleware/authMiddleware.js'

const router = express.Router()

//usuario
router.post('/registrarse', userController.registerUser)  
router.post('/login', userController.loginUser) 
router.get('/usuario', middleware.authenticateToken, userController.getUser); 

//boards
router.get('/boards', middleware.authenticateToken, boardsController.getBoardsByUser); 
router.get('/boards/:id', middleware.authenticateToken, boardsController.getBoardById);
router.post('/boards', middleware.authenticateToken, boardsController.createBoard); 
router.put('/boards/:id', middleware.authenticateToken, boardsController.updateBoard); 
router.delete('/boards/:id', middleware.authenticateToken, boardsController.deleteBoard);

//lists
router.get('/boards/:boardId/lists', middleware.authenticateToken, listsController.getListsByBoard); 
router.post('/boards/:boardId/lists', middleware.authenticateToken, listsController.createList); 
router.put('/lists/:id', middleware.authenticateToken, listsController.updateList); 
router.delete('/lists/:id', middleware.authenticateToken, listsController.deleteList); 

//cards
router.get('/lists/:listId/cards', middleware.authenticateToken, cardsController.getCardsByList); 
router.post('/lists/:listId/cards', middleware.authenticateToken, cardsController.createCard); 
router.put('/cards/:id', middleware.authenticateToken, cardsController.updateCard) 
router.delete('/cards/:id', middleware.authenticateToken, cardsController.deleteCard);







export default router
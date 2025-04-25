import express from 'express'
import { userController } from '../controllers/userController.js'
import { boardsController } from '../controllers/boardsController.js'
import { listsController } from '../controllers/listsController.js'
import { cardsController } from '../controllers/cardsController.js'
import { middleware } from '../middleware/authMiddleware.js'

const router = express.Router()

//usuario
router.post('/registrarse', userController.registerUser)  //check
router.post('/login', userController.loginUser) //check
router.get('/usuario', middleware.authenticateToken, userController.getUser); //check

//boards
router.get('/boards', middleware.authenticateToken, boardsController.getBoardsByUser); //check
router.get('/boards/:id', middleware.authenticateToken, boardsController.getBoardById); //check
router.post('/boards', middleware.authenticateToken, boardsController.createBoard); //check
router.put('/boards/:id', middleware.authenticateToken, boardsController.updateBoard); //check
router.delete('/boards/:id', middleware.authenticateToken, boardsController.deleteBoard); //check

//lists
router.get('/boards/:boardId/lists', middleware.authenticateToken, listsController.getListsByBoard); //check
router.post('/boards/:boardId/lists', middleware.authenticateToken, listsController.createList); //check
router.put('/lists/:id', middleware.authenticateToken, listsController.updateList); //check
router.delete('/lists/:id', middleware.authenticateToken, listsController.deleteList); //che

//cards
router.get('/lists/:listId/cards', middleware.authenticateToken, cardsController.getCardsByList);
router.post('/lists/:listId/cards', middleware.authenticateToken, cardsController.createCard); 
router.put('/cards/:id', middleware.authenticateToken, cardsController.updateCard)
router.delete('/cards/:id', middleware.authenticateToken, cardsController.deleteCard);







export default router
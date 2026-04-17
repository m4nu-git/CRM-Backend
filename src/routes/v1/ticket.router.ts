import express from 'express';
import userController from '../../controllers/user.controller';
import { isLoggedIn } from '../../validators/auth.validators';



const ticketRouter = express.Router();


ticketRouter.post('/signin', isLoggedIn, userController.signin);



export default ticketRouter;
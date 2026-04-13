import express from 'express';
import userController from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUser)
userRouter.get('/', userController.getAllUser)


export default userRouter;
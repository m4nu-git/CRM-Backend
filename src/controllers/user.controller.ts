import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository"
import UserService from "../services/user.services"

const userService : UserService = new UserService(new UserRepository);


const getUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const response = await userService.get(id);
        return res.status(200).json({
            message: 'Successfully fetched the user',
            data: response,
            err: {},
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error,
            success: false
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const response = await userService.getAll();
        return res.status(200).json({
            message: 'Successfully fetched the users',
            data: response,
            err: {},
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error,
            success: false
        })
    }
}

export default {
    getUser,
    getAllUser
}
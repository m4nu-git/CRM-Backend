import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository"
import UserService from "../services/user.services"
import { StatusCodes } from "http-status-codes";
import GenericError from "../errors/genericError";
import { unknownErrorResponse } from "../utils/response.utils";

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
        if (error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
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
        if (error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const response = await userService.create(req.body);
        return res.status(200).json({
            message: 'Successfully created the user',
            data: response,
            err: {},
            success: true
        })
    } catch(error) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);

    }
}

const signin = async (req: Request, res: Response) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(201).json({
            message: 'Successfully signed in the user',
            data: response,
            err: {},
            success: true
        })
    } catch(error: any) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
    }
}

export default {
    getUser,
    getAllUser,
    createUser,
    signin
}
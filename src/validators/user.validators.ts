import { Request, Response, NextFunction } from "express";
import CreateUserDTO from "../dtos/createUser.dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import SignInDTO from "../dtos/signin.dto";
import BadRequest from "../errors/badRequest";

export async function createUserValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : CreateUserDTO = new CreateUserDTO(req.body.email, req.body.password, req.body.name);
    const errors = await validate(incomingRequestBody)
    if (errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: new BadRequest(errorResponse),
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        })
    }
    next();
}

export async function signInValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : SignInDTO = new SignInDTO(req.body.email, req.body.password);
    const errors = await validate(incomingRequestBody)
    if (errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: new BadRequest(errorResponse),
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        })
    }
    next();
}
import { User } from "../generated/prisma/client";
import UserRepository from "../repositories/user.repository";
import CreateUserDTO from "../dtos/createUser.dto";
import bcrypt from "bcryptjs";
import ServerConfig from "../config/server.config";
import SignInDTO from "../dtos/signin.dto";
import NotFoundError from "../errors/notFound";
import UnauthorisedError from "../errors/unauthorisedError";
import { generateJWT } from "../utils/auth.utils";

class UserService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    
    async get(id: string) : Promise<User> {
        try {
            const response : User | null = await this.userRepository.get(id);
            if (!response) {
                throw {error: "Not Found!"}
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll() : Promise<User[]> {
        try {
            const users : User[] = await this.userRepository.getAll();
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(userDetails: CreateUserDTO) : Promise<User> {
        try {
            // encrypt password here
            const salt = bcrypt.genSaltSync(ServerConfig.SALT_ROUNDS);
            userDetails.password = bcrypt.hashSync(userDetails.password, salt)

            const response : User = await this.userRepository.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(signInDetail: SignInDTO) : Promise<string> {
        try {
            const user = await this.userRepository.getUserByEmail(signInDetail.email);
            if (!user) {
                throw new NotFoundError('User', 'email', signInDetail.email);
            }
            const doesPasswordMatch = bcrypt.compareSync(signInDetail.password, user.password);
            if(!doesPasswordMatch) {
                throw new UnauthorisedError();
            }
            const jwt = generateJWT({id: user.id, email: user.email, role: user.role});
            return jwt;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;
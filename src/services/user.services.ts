import { error } from "node:console";
import { User } from "../generated/prisma/client";
import UserRepository from "../repositories/user.repository";

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
        } catch {
            console.log(error);
            throw error;
        }    
    }
}

export default UserService;
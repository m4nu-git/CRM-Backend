import { IsEmail, IsString, IsNotEmpty, Length  } from "class-validator";

export default class CreateUserDTO {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    password: string;

     @IsNotEmpty()
     @IsString()
     name: string;

    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name
    }
}
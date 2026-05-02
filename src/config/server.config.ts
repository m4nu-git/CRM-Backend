import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
    MAIL_FROM: process.env.MAIL_FROM || "",
    SALT_ROUNDS: (process.env.SALT_ROUNDS == undefined) ? 10 : +process.env.SALT_ROUNDS,
    JWT_SECRET: (process.env.JWT_SECRET == undefined) ? "DUMMY" : process.env.JWT_SECRET
}

import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Book } from "./entities/Book";
import { Wishlist } from "./entities/Wishlist";

configDotenv()
export const AppDatasource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Book, Wishlist, User
    ],
    logging: false
})
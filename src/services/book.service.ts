import { IsNull } from "typeorm";
import { AppDatasource } from "../db";
import { Book } from "../entities/Book";

const repo = AppDatasource.getRepository(Book)

export class BookService {
    static async getBooks(){
        return await repo.find({
            select:{
                bookId: true,
                title: true,
                genre: true,
                price: true,
                author: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getBookById(id: number){
        const data = await repo.findOne({
            where: {
                bookId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        return data
    }

    static async createBook(model: Book){
        await repo.save({
            title: model.title,
            genre: model.genre,
            price: model.price,
            author: model.author,
            createdAt: new Date()
        })
    }

    static async updateBook(id: number, model:Book){
        const data = await this.getBookById(id)
        data.title = model.title
        data.genre = model.genre
        data.price = model.price
        data.author = model.author
        data.updatedAt = new Date()
        await repo.save(data)
    }

    static async deletedBook(id: number){
        const data = await this.getBookById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}
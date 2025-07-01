import { IsNull } from "typeorm";
import { AppDatasource } from "../db";
import { Wishlist } from "../entities/Wishlist";

const repo = AppDatasource.getRepository(Wishlist)

export class WishlistService {
    static async getWishlists(id: number) {
        return await repo.find({
            select: {
                wishlistId: true,
                bookId: true,
                userId: true,
                book: {
                    bookId: true,
                    title: true,
                    author: true,
                    price: true
                },
                createdAt: true
            },
            where: {
                userId: id,
                deletedAt: IsNull()
            },
            relations: {
                book: true
            }
        })
    }

    static async getWishlistById(user: number, id: number){
        const data = await repo.findOne({
            where: {
                wishlistId: id,
                userId: user,
                deletedAt: IsNull()
            }
        })
        
        if (data == undefined)
            throw new Error('NOT_FOUND')

        return data
    }

    static async deleteWishlist(user: number, id: number) {
        const data = await this.getWishlistById(user, id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}
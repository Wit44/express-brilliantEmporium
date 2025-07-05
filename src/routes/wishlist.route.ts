import { Router } from "express";
import { WishlistService } from "../services/wishlist.service";
import { sendError } from "../utils";

export const WishlistRoute = Router()

WishlistRoute.get('/', async(req: any, res) => {
    try {
        res.json(await WishlistService.getWishlists(req.user.id))
    } catch (e) {
        sendError(res, e)
    }
})

//TESTING
WishlistRoute.post('/', async(req: any, res) => {
    try {
        const { bookId } = req.body;
        res.json(await WishlistService.createWishlist(req.user.id, bookId))
    } catch (e) {
        sendError(res, e)
    }
})

WishlistRoute.get('/:id', async (req: any,res) => {
    try {
        const id = Number(req.params.id)
        res.json(await WishlistService.getWishlistById(req.user.id, id))
    } catch (e) {
        sendError(res, e)
    }
})

WishlistRoute.delete('/:id', async(req:any, res) => {
    try {
        const id = Number(req.params.id)
        await WishlistService.deleteWishlist(req.user.id, id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})
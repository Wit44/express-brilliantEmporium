import { Router } from "express";
import { BookService } from "../services/book.service";
import { sendError } from "../utils";
import { Book } from "../entities/Book";

export const BookRoute = Router()

BookRoute.get('/', async (req, res) => {
    try {
        res.json(await BookService.getBooks())
    } catch (e) {
        sendError(res, e)
    }
})

BookRoute.get('/:id', async(req, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await BookService.getBookById(id))
    } catch (e) {
        sendError(res, e)
    }
})

BookRoute.post('/', async (req, res) => {
    try {
        await BookService.createBook(req.body)
        res.status(204).send()
    } catch(e) {
        sendError(res, e)
    }
})

BookRoute.put('/:id', async (req,res) => {
    try {
        const id = Number(req.params.id)
        await BookService.updateBook(id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

BookRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await BookService.deletedBook(id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})
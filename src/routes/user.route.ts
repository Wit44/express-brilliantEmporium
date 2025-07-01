import { Router } from "express"
import { UserService } from "../services/user.service"
import { sendError } from "../utils"

export const UserRoute = Router()

UserRoute.post('/login', async (req, res) => {
    try {
        res.json(await UserService.login(req.body))
    } catch (e: any) {
        sendError(res, e, 401)
    }
})


UserRoute.post('/refresh', async (req, res) => {
    try {
        const auth = req.headers['authorization']
        const token = auth && auth.split(' ')[1]
        res.json(await UserService.refreshToken(token!))
    } catch (e: any) {
        sendError(res, e, 401)
    }
})
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDatasource } from './db'
import { UserService } from './services/user.service'
import { BookRoute } from './routes/book.route'
import { UserRoute } from './routes/user.route'
import https from 'https'
import fs from 'fs'
import { WishlistRoute } from './routes/wishlist.route'


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


app.use(UserService.verifyToken)
app.use('/api/book', BookRoute)
app.use('/api/user', UserRoute)
app.use('/api/wishlist', WishlistRoute)


const sslOptions = {
    key: fs.readFileSync('./src/crypto/key.pem'),
    cert: fs.readFileSync('./src/crypto/cert.pem')
}

configDotenv()
AppDatasource.initialize()
    .then(() => {
        console.log('Connected to the database')
        const port = process.env.SERVER_PORT || 5000

        https.createServer(sslOptions, app)
            .listen(port, () => 
                console.log(`Application started on the port ${port}`)
        )
    })
    .catch(e => {
        console.log('Database server connection failed')
        console.log(e)
    })
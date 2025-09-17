import "dotenv/config"

import express, { NextFunction, Request, Response } from "express"

import cors from "cors"
import session from "cookie-session"
import { config } from "./config/app.config"
import { connectDB } from "./config/db.config"
  
const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 100,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: 'lax'

    })
)

app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true
    })
)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "heelo there"
    })
})


app.listen(config.PORT, async()=>{
    console.log(`server is started at ${config.PORT} in ${config.NODE_ENV}`)
    await connectDB()
})
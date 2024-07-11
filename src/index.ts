import express, { Application, NextFunction, Request, Response, urlencoded } from "express"
import cors from "cors"
import router from "./routers"
import 'dotenv/config'

const app: Application = express()
const port: Number = 5670

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
    res.send({
        hello: 'world',
        env: JSON.stringify(process.env.JWT_SECRET_KEY)
    })
})

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("ini paling duluan ?")
    next()
})

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("ini udah middleware paling luar")
    next()
}, router)

app.listen(port, () => {
    console.log("Application running on PORT = ", port)
})
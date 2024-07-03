import express, { Application, Request, Response, urlencoded } from "express"
import cors from "cors"
import router from "./routers"

const app: Application = express()
const port: Number = 5670

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
    res.send({
        hello: 'world'
    })
})

app.use(router)

app.listen(port, () => {
    console.log("Application running on PORT = ", port)
})
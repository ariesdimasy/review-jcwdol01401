import fs from "fs"
import pino from "pino"

export const logErrorHandler = (message: string): void => {
    const timestamp = new Date().toISOString()
    const logMessage = `${timestamp} - ${message} \n`

    pino().info(message)

    fs.appendFile("error.log", logMessage, (err) => {
        if (err) {
            console.error(`Error writing to the log file : ${err.message}`)
        }
    })
}
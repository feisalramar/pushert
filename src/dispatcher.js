import pusher from 'pusher'
import Pusher from "pusher";
import {readConfig} from "./reader.js";
import chalk from "chalk";

const dispatch = async (message, channel, data) => {
    let config = await readConfig()
    const pusher = new Pusher({
        secret: config.secret,
        key: config.key,
        appId: config.appId,
        tls: config.tls ?? false,
        cluster: config.cluster ?? "eu"
    })

    try{
        const signal = pusher.trigger(
            channel,
            message,
            data
        )
        console.log(chalk.italic(`"${chalk.green(message)}" sent to channel "${chalk.yellow(channel)}" with ${chalk.magenta(JSON.stringify(data))} `))
    }catch(error){
        console.log("Invalid Arguments")
        chalk.red(error)
    }
}

export default dispatch
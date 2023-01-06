#!/usr/bin/env node
import { readConfig } from "./reader.js";
import yargsParser from "yargs-parser"
import {writeFile} from "fs/promises";
import {getConfigPath, getVersion} from "./utils/helpers.js";
import template from "./utils/template.js";
import chalk from "chalk";
import Pusher from "pusher";
import dispatch from "./dispatcher.js";
import {helpTemplate} from "./printHelp.js";

const argv = yargsParser(process.argv.slice(2))

const main = async () => {
    let config = await readConfig()
    const { _: command, help, version} = argv
    const commandSize = command.length

    if(help){
        console.log(helpTemplate)
        return
    }

    if(version){
        getVersion()
        return
    }



    if(command[0] === "config"){
        const  { key, secret, id, tls, channel, cluster } = argv
        // TODO: Validate these inputs
        config.appId = id ?? config.appId
        config.secret = secret ?? config.secret
        config.key = key ?? config.key
        config.tls = tls ?? config.tls
        config.cluster = cluster ?? config.cluster
        config.channel = channel ?? config.channel
        writeFile(getConfigPath(), JSON.stringify(config))
            .then(() => {
                console.log("Configuration Saved")
            })
            .catch(error => {
                console.log("Error", error)
            })
    }else{
        if(config.key === "" && config.secret===""&& (config.id==="" || config.id===0)){
            chalk.red("Unknown Credentials: Please run config first")
        }
        const [ message, channel, data ] = command

        if (channel && data) {
            console.log({
                message: message,
                channel: channel,
                data: data ?? {}
            })
            dispatch(message,channel,{})
        } else if (channel) {
            dispatch(message,channel,data ?? {})
        } else {
            dispatch(message, "hakuna-matata", {})
        }
}

}

// if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.log(" Error occured ");
        console.log(error);
    }
// }
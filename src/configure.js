#!/usr/bin/env node

import {
    writeFile,
    readFile,
    access,
    chmod,
    mkdir,
    rm,
    rmdir
} from "fs/promises"
import template from "./utils/template.js"
import {  getConfigPath, getDirPath } from "./utils/helpers.js";
import chalk from "chalk";
import {readConfig} from "./getConfiguration.js";

const configure = async (dir) => {
   return access(dir)
        .then(() => {
            generateTemplate()
        })
        .catch(error => {
            if(error.errno === -2 ){
                // Directory not Found
                makeDir(dir)
            }
        })
}

const makeDir = async (path) => {
    return mkdir(path)
        .then(dir=> {
            generateTemplate()
        })
        .catch(err => {
            console.log("Dir Error")
        })
}

const deleteConfigFile = async () => {
    await rm(getConfigPath())
}

const deleteConfigPath = async () => {
    await rmdir(getDirPath())
}

const generateTemplate = async () =>  writeFile(getConfigPath(), JSON.stringify(template))
    .then(() => {
        // chmod(getConfigPath(),755)
        console.log("Configuration Saved")
        chalk.greenBright(readConfig().toString())
    })
    .catch(error => {
        console.log("Error", error)
    })

await configure(getDirPath())

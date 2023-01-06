import { readFile } from 'fs/promises'
import { getConfigPath } from "./utils/helpers.js";

export const readConfig  = async () => {
    const content = await readFile(getConfigPath())
    const config = JSON.parse(content.toString())
    return config
}



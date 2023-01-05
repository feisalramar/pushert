// #!/usr/bin/env node

// const yargs = require('yargs/yargs')
// const cfg = require('config')
// const Pusher = require("pusher");
// const { writeFileSync, readFileSync } = require('jsonfile')
// const chalk = require('chalk')
// const path = require('path')
// const os = require('os')

// const fs = require('fs-extra')

// const { hideBin } = require('yargs/helpers');
// const argv = yargs(hideBin(process.argv)).argv

// const isConfigured = () => {
//     if (!cfg.has('secret') || cfg.get('secret') === "") {
//         console.log(chalk.red("Please set Pusher API Secret"))
//         console.log(chalk.cyan(`To configure run "${chalk.yellow(chalk.italic('pushert config --secret="******" '))}`))
//         return false
//     } else if (!cfg.has('key') || cfg.get('key') === "") {
//         console.log(chalk.red("Please set Pusher API Key"))
//         console.log(chalk.cyan(`To configure run "${chalk.yellow(chalk.italic('pushert config --key="******" '))}`))
//         return false
//     } else if (!cfg.has('appId') || cfg.get('appId') === "") {
//         console.log(chalk.red("Please set Application ID"))
//         console.log(chalk.cyan(`To configure run "${chalk.yellow(chalk.italic('pushert config --id="******" '))}`))
//         return false
//     } else {
//         return true
//     }
// }

// const isInConfig = (property) => {
//     return cfg.has(property)
// }



// async function main() {
//     const configDir = path.join(os.homedir(), ".pushert")
//     const configFile = path.join(os.homedir(),'default.json')

//     // const dirExist = fs.pathExistsSync(readConfigFile)

//     fs.ensureFileSync(configFile)

//     // if (!existsSync(configFile)){
//     //     console.log('config doesnot file exists');
//     //     if (!fs.existsSync(configDir)) {
//     //         fs.mkdirSync(configDir)
//     //     }
//     //     fs.writeFileSync(configFile, "{}")
//     // }else{
//     //     console.log("config exists");
//     //     const file = readFileSync(configFile)
//     //     console.log(file);
//     // }

//     try {
//         const { secret, id, cluster, tls, key, _ } = argv
//         const [firstCommand, secondCommand, thirdCommand] = _

//         if (firstCommand) {
//             if (firstCommand === "config") {
//                 // This is the configration path
//                 // Getting the default/current configrations
//                 const pusherConfig = {
//                     secret: isInConfig('secret') ? cfg.get("secret") : "",
//                     key: isInConfig('key') ? cfg.get("key") : "",
//                     cluster: isInConfig('cluster') ? cfg.get("cluster") : "eu",
//                     tls: isInConfig('tls') ? cfg.get("tls") : false,
//                     appId: isInConfig('appId') ? cfg.get("appId") : "",
//                 }

//                 // Check if user is trying to override secret value
//                 if (secret) {
//                     // Changing secret value in the current configuration
//                     pusherConfig.secret = secret
//                 }

//                 if (key) {
//                     pusherConfig.key = key
//                 }

//                 if (cluster) {
//                     pusherConfig.cluster = cluster
//                 }

//                 if (id) {
//                     pusherConfig.appId = id
//                 }

//                 if (tls) {
//                     pusherConfig.tls = !!tls
//                 }

//                 writeFileSync(configFile, pusherConfig)

//                 if (secret || key) {
//                     console.log("Configuration Saved ", pusherConfig)
//                 } else {
//                     console.log(pusherConfig)
//                 }
//             } else {
//                 if (!isConfigured()) {
//                     return;
//                 }
//                 // The first command is not a message
//                 const pusher = new Pusher({
//                     secret: cfg.get('secret'),
//                     key: cfg.get('key'),
//                     appId: cfg.get('appId'),
//                     tls: cfg.get('tls'),
//                     cluster: cfg.get('cluster')
//                 })
//                 if (secondCommand && thirdCommand) {
//                     // console.log({
//                     //     message: firstCommand,
//                     //     channel: secondCommand,
//                     //     data: thirdCommand
//                     // })

//                     // Validation The third command must be jison object, first and second command is String
//                     (async () => {
//                         try {
//                             await pusher.trigger(
//                                 secondCommand,
//                                 firstCommand,
//                                 thirdCommand
//                             )
//                             // TODO : format output message
//                             console.log(chalk.italic(`"${chalk.green(firstCommand)}" sent to channel "${chalk.yellow(secondCommand)}" with ${chalk.magenta(thirdCommand)} `))
//                         } catch (error) {
//                             console.table(error)
//                         }
//                     })()
//                 }
//                 else if (secondCommand) {

//                     (async () => {
//                         try {
//                             await pusher.trigger(
//                                 secondCommand,
//                                 firstCommand,
//                                 {

//                                 }
//                             )
//                             // TODO : format output message
//                             chalk.italic(console.log(`"${chalk.green(firstCommand)}" sent to channel "${chalk.yellow(secondCommand)}" with {} `))
//                         } catch (error) {
//                             console.log(chalk.red(error.body))
//                         }
//                     })()
//                     // console.log({
//                     //     message: firstCommand,
//                     //     channel: secondCommand
//                     // })
//                 } else {
//                     console.log(
//                         'Please provide the channel to publish the message '
//                         , {
//                             message: firstCommand
//                         })

//                 }
//             }
//         }
//     }
//     catch (error) {
//         console.log(" Error occured ", error);
//     }
// }

// if (require.main === module) {
//     try {
//         main();
//     } catch (error) {
//         console.log(" Error occured ");
//         console.log(error);
//     }
// }
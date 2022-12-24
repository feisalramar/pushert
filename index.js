#!/usr/bin/env node

const yargs = require('yargs/yargs')
const cfg = require('config')
const Pusher = require("pusher");
const { writeFileSync } = require('jsonfile')
const configFile = './config/default.json'

const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function main() {
    const { secret, id, cluster, tls, key, _ } = argv
    const [firstCommand, secondCommand, thirdCommand] = _

    if (firstCommand) {
        if (firstCommand === "config") {
            // This is the configration path
            // Getting the default/current configrations
            const pusherConfig = {
                secret: cfg.get("secret"),
                key: cfg.get("key"),
                cluster: cfg.get("cluster"),
                tls: cfg.get("tls"),
                appId: cfg.get("appId")
            }

            // Check if user is trying to override secret value
            if (secret) {
                // Changing secret value in the current configuration
                pusherConfig.secret = secret
            }

            if (key) {
                pusherConfig.key = key
            }

            if (cluster) {
                pusherConfig.cluster = cluster
            }

            if (id) {
                pusherConfig.appId = id
            }

            if (tls) {
                pusherConfig.tls = !!tls
            }

            writeFileSync(configFile, pusherConfig)

            if (secret || key) {
                console.log("Configuration Saved ", pusherConfig)
            } else {
                console.log(pusherConfig)
            }
        } else {
            // The first command is not a message 
            const pusher = new Pusher({
                secret: cfg.get('secret'),
                key: cfg.get('key'),
                appId: cfg.get('appId'),
                tls: cfg.get('tls'),
                cluster: cfg.get('cluster')
            })
            if (secondCommand && thirdCommand) {
                // console.log({
                //     message: firstCommand,
                //     channel: secondCommand,
                //     data: thirdCommand
                // })

                // Validation The third command must be jison object, first and second command is String
                (async () => {
                    await pusher.trigger(
                        secondCommand,
                        firstCommand,
                        thirdCommand
                    )
                })()
            }
            else if (secondCommand) {

                (async () => {
                    await pusher.trigger(
                        secondCommand,
                        firstCommand,
                        {

                        }
                    )
                })()
                // console.log({
                //     message: firstCommand,
                //     channel: secondCommand
                // })
            } else {
                console.log(
                    'Please provide the channel to publish the message '
                    , {
                        message: firstCommand
                    })

            }
        }
    }

}

if (require.main === module) {
    main();
}
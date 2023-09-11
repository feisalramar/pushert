# Pushert

A command line tool to test pusher events on a channel

# Installation

`npm install --global pushert`

or

`npm i -g pushert`

Using Yarn

`yarn global add pushert`

# Configuration

The default configuration file contains,

`json
    {
        "appId":"",
        "key": "",
        "secret" :"",
        "cluster": "ap2"
        "tls": true,
    }
`

configuration is done during installation or done manual via command

`pushert config`

Configuration is saved on the following path

On Unix 
`/home/username/.config/.pushert-config.json`

On Window 
`C\\.config\.pushert-config.json`

# Usage

## Publish event to the channel

Cli expect 3 parameter

- Channel : Channel to broadcast the message
- Event : Event to be published
- Message : Content to be sent { String, Stringified JSON }

`pushert publish <channel> <event> <message>`

Example

`pushert pubslish TestChannel TestEvent "hello world"`

or

`pushert pubslish TestChannel TestEvent  "{ name: 'John Doe'} `

## Subscribe to event from channel

Cli expect 3 parameter

- Channel : Channel to subscribe for events
- Event : Event to be listened

`pusher subscribe <channel> <event>`

Example

`pusher subscribe TestChannel TestEvent`


# Uninstallation

`npm uninstall -g pushert`

or

`npm remove -g pushert`

Using Yarn

`yarn global remove pushert`

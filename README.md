# Pushert

A command line tool to test pusher events on a channel

# Installation

`npm install --global pushert`

or

`npm i -g pushert`

Using Yarn

`yarn global add pushert`

# Configuration
The default configuration file contains 

`json
    {
        "secret" :"",
        "key": "",
        "appId":"",
        "tls": false,
        "cluster": "eu"
    }
`

You must start configuring the tool to your pusher parameters

`pushert config --secret=********* --tls=true --key=********* --id=12345`


# Usage 

Parameters 

Cli expect 3 parameter 

- Message : Content to be sent 
- Channel : Channel to broadcast the message
- Data (optional): Pusher event data to be sent in stringified JSON Format default is {}

`pushert message channel data`

Example

`pushert "Test Message" testchannel`

or

`pushert "This is the test message" TestChannel "{ name: 'John Doe'} `

# Uninstallation 

`npm uninstall -g pushert`

or 

`npm remove -g pushert`

Using Yarn

`yarn global remove pushert`


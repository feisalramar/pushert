# Pushert
z
Pushert is a Command Line Interface (CLI) application for testing Pusher methods. With Pushert, you can easily configure Pusher credentials, publish messages to Pusher channels, and subscribe to events on Pusher channels.

# Installation

```bash 
npm install --global pushert
```

or

```bash 
npm i -g pushert
```

Using Yarn

```bash
yarn global add pushert
```

# Configuration

The default configuration file contains,

```json
    {
        "appId":"",
        "key": "",
        "secret" :"",
        "cluster": "ap2"
        "tls": true,
    }
```

configuration is done during installation or done manual via command

```bash 
pushert config
```

Configuration is saved on the following path

On Unix 
```bash 
/home/username/.config/.pushert-config.json
```

On Window 
```bash 
C:\\.config\.pushert-config.json
```

# Usage

## Publish event to the channel

Cli expect 3 parameter

- Channel : Channel to broadcast the message
- Event : Event to be published
- Message : Content to be sent { String, Stringified JSON }

```bash 
pushert publish <channel> <event> <message>
```

Example

```bash 
pushert pubslish TestChannel TestEvent "hello world"
```

or

```bash 
pushert pubslish TestChannel TestEvent  "{ name: 'John Doe'} 
```

## Subscribe to event from channel

Cli expect 3 parameter

- Channel : Channel to subscribe for events
- Event : Event to be listened

```bash 
pusher subscribe <channel> <event>
```

Example

```bash  
pusher subscribe TestChannel TestEvent
```

# Uninstallation

```bash 
npm uninstall -g pushert
```

or

```bash 
npm remove -g pushert
```

Using Yarn

```bash 
yarn global remove pushert
```

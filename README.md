# Pushert

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
The Pusher CLI stores your Pusher credentials in a configuration file named .`pusher-config.json`.

On Unix 
```bash 
/home/{username}/.config/.pushert-config.json
```

On Window 
```bash 
C:\Users\{username}\.pushert-config.json
```

Configuration file contains the following:

```json
{
    "appId": string,
    "key": string,
    "secret" : string,
    "cluster": string
    "tls": boolean,
}
```

Before using the Pushert, you need to configure your Pusher credentials by running the following command:

```bash 
pushert config
```
Follow the prompts to enter your Pusher API Key, API Secret and other options.

or

You can manually edit the file using Text editor.

# Usage

## Publishing a Message

To publish a message to a Pusher channel and event, use the publish command:

```bash 
pushert publish <channel> <event> <message>
```

|  Paramater       | Description           |
| ------------- |-------------|
|  `<channel>` | The name of the Pusher channel. |
| `<message>` | The message you want to send. It should be a valid JSON object.      |
| `<event>`   |  The name of the event to trigger.  |



Example

```bash 
pushert publish my-channel my-event 'Hello, Pusher!'

```

or

```bash 
pushert publish my-channel my-event '{"message": "Hello, Pusher!"}'
```

## Subscribing to an Event

To subscribe to a Pusher channel and event, use the subscribe command:

```bash 
pushert subscribe <channel> <event>
```


|  Paramater       | Description           |
| ------------- |-------------|
|  `<channel>` | The name of the Pusher channel. |
| `<event>`   |  The name of the event you want to subscribe to.  |


Example

```bash  
pushert subscribe my-channel my-event
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

# Acknowledgments
* [Pusher](https://pusher.com) for their real-time messaging platform.
* [Commander](https://github.com/tj/commander.js) for the command-line interface framework.
* [dotenv](https://www.npmjs.com/package/dotenv) for managing environment variables.

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# Author
[Feisal Ali]([dev.feisalramar@gmail.com](https://tz.linkedin.com/in/feisalramadhan))



# Contact

For any inquiries, please contact me via [dev.feisalramar@gmail.com](mailto:dev.feisalramar@gmail.com)


### Connect with me
#### Social Networks
> Facebook, tiktok, youtube, instagram as "feisalramar" 

#### Skype

> feisalramar@outlook.com

#### Playstation Network and Twitch
> fxl_pro
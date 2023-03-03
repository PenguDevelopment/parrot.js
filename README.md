
# Parrot.js
### The simple framework for advanced bots
---
## Features

- Simpler than discord.js
- Small size so wont add much to your already large discord.js
- Easier command handling

## Installation

`@ratinchat/parrot.js` depends on the following packages. Be sure to install these along with this package!

-   [`discord.js`](https://www.npmjs.com/package/discord.js)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @ratinchat/parrot.js discord.js@14.x
```

---
## Simple Setup
To create your bot, we recommend you use this as your index.js:
```js
import parrot from '@ratinchat/parrot.js';

import dotenv from 'dotenv';
dotenv.config();

const bot = new parrot.Bot({
    token: process.env.TOKEN,
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
});
```
Feel free to change the intents as needed.  
## More Information
Commands:
```js
const commands = bot.initCommands({
    prefix: '!'
});

commands.newCommand({
    name: 'ping',
    description: 'Get the ping of the bot',
    args: [
        {
          name: 'channel',
          description: 'Channel to send the embed to',
          required: false,
          type: parrot.Options.CHANNEL
        }
    ],
    execute: async (message, { channel }) => {
        if (channel) {
            channel.send("The ping is " + parrot.getPing())
        }
        message.send("The ping is " + parrot.getPing())
    }
});
```
Make sure to only run this part once in your code:
```js
const commands = bot.initCommands({
    prefix: '!'
});
```
You can always add a custom prefix and/or no args in the command:
```js
const commands = bot.initCommands({
    prefix: '!'
});

commands.newCommand({
    name: 'ping',
    description: 'Get the ping of the bot',
    prefix: '%',
    execute: async (message, { channel }) => {
        if (channel) {
            channel.send("The ping is " + parrot.getPing())
        }
        message.send("The ping is " + parrot.getPing())
    }
});
```
To add other folders like cmds you must run:
```js
parrot.ImportCommands(bot, './cmd'); 
```
You can put this code anywhere after you inizialize your bot (make sure to change bot and './cmd' to your personal preferences). This will import all text commands you have in that folder.  
  
In that folder you can create modular commands like this:
```js
import parrot from '@ratinchat/parrot.js';

const command = new parrot.TextCommand({
    name: 'kill',
    description: 'Kill A User',
    args: [
        {
            name: 'user',
            description: 'User to kill',
            required: true,
            type: parrot.Options.USER
        }
    ],
    execute: async (message, { user }) => {
        await message.send(`Killed ${user.username}!`);
    }
})

export { command };
```
Feel free to change the commands as needed. Pass your arguments in the {} part of the statment.
### Note: We do not currently support slash commands!
## Current Options
Here are the current options to the parrot.Options:
```js
- CHANNEL,
- USER,
- ROLE,
- NUMBER,
- STRING,
- BOOLEAN,
- EMOJI
```
That is all for this guide. More will be added soon, so stay viligant!

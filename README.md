
![parrot.js](https://socialify.git.ci/PenguDevelopment/parrot.js/image?description=1&descriptionEditable=The%20simple%20framework%20for%20advanced%20bots.&forks=1&issues=1&language=1&logo=https%3A%2F%2FMagiCloud.ParrotDev.repl.co%2Fuploads%2Fparrot.png&name=1&pattern=Solid&stargazers=1&theme=Dark)
#### Status: (In Development)
---
## Features

- Simpler than discord.js
- Small size so wont add much to your already large discord.js
- Easier Context Command handling
- Easier Slash Command handling

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
## Context Commands
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
            channel.send("The ping is " + bot.getPing())
        }
        message.send("The ping is " + bot.getPing())
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
## Slash Commands
You can create slash commands by running this code:
```js
const interactionCommands = bot.initSlashCommands();

interactionCommands.newCommand({
    name: 'kill',
    description: 'Kill A User',
    permissions: [parrot.Permissions.UseExternalStickers],
    args: [
        {
            name: 'user',
            description: 'User to kill',
            required: true,
            type: parrot.Options.USER
        }
    ],
    execute: async (interaction, { user }) => {
        await interaction.reply(`Killed ${user}!`);
    }
});
```
You can import slash commands from other folders like this:
```js
await parrot.ImportSlashCommands(bot, './SlashCmds');
```
You can make external slash commands like this:
```js
import parrot from '@ratinchat/parrot.js';

const command = new parrot.SlashCommand({
    name: 'revive',
    description: 'Revive a user',
    args: [
        {
            name: 'user',
            description: 'User to revive',
            required: true,
            type: parrot.Options.USER
        }
    ],
    execute: async (interaction, { user }) => { 
        await interaction.replyEphemeral({ content: `Revived ${user}!`});
    }
});

export { command };
```
You can register all the slash commands you have but running either:  
Option 1:
```js
await interactionCommands.registerAll(process.env.TOKEN, bot);
```
Option 2 (only if you have not run bot.initSlashCommands())
```js
bot.initSlashCommands().registerAll(process.env.TOKEN, bot);
```
(Option 2 not tested yet!). 
#### Note: Make sure to run register AFTER you have imported your slash commands from external folders! If you don't, you may not see them register!
## New functions
We have currently added 2 new functions that replace old ones.  
### Function 1
Discord.js
```js
message.channel.send();
```
Parrot.js
```js
message.send();
```
### Function 2
Parrot.js
```js
interaction.replyEphemeral()
```
Make sure to change token to your token!
## Current Options
Here are the current options to the parrot.Options:
```js
        USER,
        MENTIONABLE,
        CHANNEL,
        ROLE,
        STRING,
        INTEGER,
        BOOLEAN,
        NUMBER,
        ATTACHMENT,
        SUB_COMMAND,
        SUB_COMMAND_GROUP,
        EMOJI
```
#### Note: Some options may or may not work!
That is all for this guide. More will be added soon, so stay viligant!

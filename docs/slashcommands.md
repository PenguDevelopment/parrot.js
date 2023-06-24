
# Slash Commands
?> Note: Slash commands are very similar to text commands.

To initialize slash commands, use the following code:
```js
const interactionCommands = bot.initSlashCommands();
```
To create a slash command, use the following code:
```js
interactionCommands.newCommand({
    name: 'ping',
    description: 'Ping the bot',
    execute: async (interaction) => {
        await interaction.reply("The ping is " + bot.getPing());
    }
});
```

---

## Command Arguments
You can add arguments to your commands like this:
```js
interactionCommands.newCommand({
    name: 'repeat',
    description: 'Repeat a message',
    args: [
        {
            name: 'message',
            description: 'The message to repeat',
            required: true,
            type: parrot.Options.String
        }
    ],
    execute: async (interaction, { message }) => {
        await interaction.reply(message);
    }
});
```

---

## Importing Slash Commands

You can import slash commands from other folders like this:
```js
await parrot.ImportSlashCommands(bot, './SlashCmds');
```

---

## External Slash Commands

You can make external slash commands like this:
```js
import parrot from '@ratinchat/parrot.js';

const command = new parrot.SlashCommand({
    name: 'revive',
    description: 'Revive a user',
    execute: async (interaction) => { 
        await interaction.reply('Revived!');
    }
});

export { command };
```
You can register all the slash commands you have by running either:  
* Option 1:
```js
await interactionCommands.registerAll(process.env.TOKEN, bot);
```
* Option 2 (only if you have not run bot.initSlashCommands())
```js
await bot.initSlashCommands().registerAll(process.env.TOKEN, bot);
```

!> Make sure to run this after you have imported all your commands, or else it will not register all of them.

---

## Command Permissions

You can add permissions to your commands like this:

```js
interactionCommands.newCommand({
    name: 'ping',
    description: 'Get the bot\'s ping',
    permissions: [parrot.Permissions.Administrator],
    execute: async (interaction) => {
        await interaction.reply("The ping is " + bot.getPing());
    }
});
```

?> Note: Bot permissions are exactly the same as discord.js's `PermissionsBitField.Flags`.

---

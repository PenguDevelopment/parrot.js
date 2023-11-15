# Quick Start

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```
npm install @ratinchat/parrot.js
```

---

## Initialize

To initialize your bot, use the following code:

```js
import parrot from "@ratinchat/parrot.js";

import dotenv from "dotenv";
dotenv.config();

const bot = new parrot.Bot({
  token: process.env.TOKEN,
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
```

In this example we use dotenv to hide our token. You can use any other method you want.

!> In parrot.js you do not need to add a `client.login()` statement as it is already included in the bot.

Feel free to change the intents as needed.

---

## Text Commands

To initialize text commands, use the following code:

```js
const commands = bot.initCommands();
```

Bot takes an optional object with a prefix property.

```js
const commands = bot.initCommands({
  prefix: "!",
});
```

This adds a default prefix to all commands.

?> Note: Prefixes set in the command will override this prefix.

To create a command, use the following code:

```js
commands.newCommand({
  name: "ping",
  description: "Get the ping of the bot",
  execute: async (message) => {
    message.send("The ping is " + bot.getPing());
  },
});
```

---

## Importing Commands

You can import commands from other folders like this:

```js
parrot.ImportCommands(bot, "./commands");
```

Make sure to change './commands' to your folder. (Use a relative path).

!> The `bot` variable is the bot you created with `new parrot.Client`.

---

## External Commands

You can make external commands like this:

```js
import parrot from "@ratinchat/parrot.js";
```

In that folder you can create external commands like this:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.TextCommand({
  name: "ping",
  description: "Get the ping of the bot",
  execute: async (message) => {
    message.send("The ping is " + bot.getPing());
  },
});

export { command };
```

---

## Slash Commands

To initialize slash commands, use the following code:

```js
const interactionCommands = bot.initSlashCommands();
```

To create a slash command, use the following code:

```js
interactionCommands.newCommand({
  name: "ping",
  description: "Ping the bot",
  execute: async (interaction) => {
    await interaction.reply("The ping is " + bot.getPing());
  },
});
```

---

## Importing Slash Commands

You can import slash commands from other folders like this:

```js
await parrot.ImportSlashCommands(bot, "./SlashCmds");
```

---

## External Slash Commands

You can make external slash commands like this:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "revive",
  description: "Revive a user",
  execute: async (interaction) => {
    await interaction.reply("Revived!");
  },
});

export { command };
```

You can register all the slash commands you have by running either:

- Option 1:

```js
await interactionCommands.registerAll(process.env.TOKEN, bot);
```

- Option 2 (only if you have not run bot.initSlashCommands())

```js
await bot.initSlashCommands().registerAll(process.env.TOKEN, bot);
```

!> Make sure to run this after you have imported all your commands, or else it will not register all of them.

---

## Important Notes

There are a few new changes to parrot.js that have been made.

- `message.channel.send` has been changed to `message.send`.
- `interaction.reply({ content: 'hi', ephemeral: true})` has been changed to `interaction.replyEphemeral('hi')`.

---

## Current Options

Here is a list of all the current options:

```js
User,
  Mentionable,
  Channel,
  Role,
  String,
  Integer,
  Boolean,
  Number,
  Attachment,
  SubCommand,
  SubCommandGroup,
  Emoji;
```

---

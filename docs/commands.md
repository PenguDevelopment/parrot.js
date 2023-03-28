# Text Commands
To initialize text commands, use the following code:

```js
const commands = bot.initCommands();
```
Bot takes an optional object with a prefix property.
```js
const commands = bot.initCommands({
    prefix: '!'
});
```
This adds a default prefix to all commands. 

?> Note: Prefixes set in the command will override this prefix.

To create a command, use the following code:
```js
commands.newCommand({
    name: 'ping',
    description: 'Get the ping of the bot',
    execute: async (message) => {
        message.send("The ping is " + bot.getPing())
    }
});
```

---

## Command Arguments
You can add arguments to your commands like this:
```js
contextCommands.newCommand({
    name: 'ping',
    description: 'Ping A User',
    permissions: [parrot.Permissions.UseExternalStickers],
    args: [
        {
            name: 'user',
            description: 'User to ping',
            length: 1,
            type: parrot.Options.User
        },
        {
            name: 'reason',
            description: 'Reason for pinging',
            length: 'infinity',
            type: parrot.Options.String
        }
    ],
    execute: async (message, { user, reason }) => {
        if (!user) { return message.send("No user provided") } else {
            await message.send(`Helo ${user}! ${reason}`);
        }
    }
});
```

!> the infinity option absolutely **must** be a string and at the end of your arguments!

The `args` property is an array of objects. Each object is an argument.
All arguments are returned in a variable called `args` in the execute function. Though you can use `(message, { message })` to get the message argument, instead of `(message, args.message)` or `(message, args)`.

?> The `args` returned by the user are automatically checked for the type you specified. If the user doesn't provide the correct type, the command will return an error.

---

## Importing Commands
You can import commands from other folders like this:
```js
parrot.ImportCommands(bot, './commands'); 
```
Make sure to change './commands' to your folder. (Use a relative path).  

!> The `bot` variable is the bot you created with `new parrot.Client`.

---

## External Commands
You can make external commands like this:
```js
import parrot from '@ratinchat/parrot.js';
```

In that folder you can create external commands like this:

```js
import parrot from '@ratinchat/parrot.js';

const command = new parrot.TextCommand({
    name: 'revive',
    description: 'Revive a user',
    args: [
        {
            name: 'user',
            description: 'The user to revive',
            required: true,
            type: 'user'
        }
    ],
    execute: async (message, { user }) => {
        await message.send(`Revived ${user.username}`);
    }
});

export { command }
```

---

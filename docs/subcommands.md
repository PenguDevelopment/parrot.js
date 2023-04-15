# Subcommands

To create a subcommand for interaction commands, you can use the following code:

```js
interactionCommands.newCommand({
    name: 'subcommand',
    description: 'Subcommand example',
    permissions: [parrot.Permissions.UseExternalStickers],
    subcommands: [
        {
            name: 'subcommand1',
            description: 'Subcommand 1',
        },
    ],
    execute: async (interaction) => {
        // handle subcommand
        const subcommand = interaction.getSubcommand('subcommand1');
        if (subcommand) {
            // handle subcommand1
        }
    }
});
```

---

## Subcommand Groups
To create a subcommand groups for interaction commands, you can use the following code:

```js
interactionCommands.newCommand({
    name: 'revive',
    description: 'Revive a user',
    subcommandGroups: [
        {
            name: 'user',
            description: 'Select a user to revive',
            subcommands: [
                {
                    name: 'user1',
                    description: 'Revive user 1',
                }
            ]
        }
    ],
    execute: async (interaction) => {
        const subcommand = await interaction.getSubcommand('user1');
        if (subcommand) {
            await interaction.reply('You revived user 1!');
        }
    }
});
```

---

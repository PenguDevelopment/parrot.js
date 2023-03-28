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
            execute: async (interaction) => {
                await interaction.reply('Subcommand 1');
            }
        },
    ],
    execute: async (interaction) => {
        // handling the subcommand.
    }
});
```

---

## Handling Subcommands

To handle subcommands, you can use the following code:

```js
interactionCommands.newCommand({
    name: 'subcommand',
    description: 'Subcommand example',
    permissions: [parrot.Permissions.UseExternalStickers],
    subcommands: [
        {
            name: 'subcommand1',
            description: 'Subcommand 1',
            execute: async (interaction) => {
                await interaction.reply('Subcommand 1');
            }
        },
    ],
    execute: async (interaction) => {
        const subcommand = interaction.getSubcommand('subcommand1');
        if (subcommand) {
            await subcommand.execute(interaction);
        }
    }
});
```

---

## Subcommand Groups
coming soon.

---

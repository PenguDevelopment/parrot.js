# Context Menus

Due to how context menus work, to initialize them you have to initialize slash commands.

To initialize slash commands, use the following code:

```js
const interactionCommands = bot.initSlashCommands();
```

To create a context menu, use the following code:

```js
interactionCommands.newContextMenu({
  name: "test",
  type: parrot.ContextMenuType.User,
  execute: async (interaction) => {
    await interaction.reply({ content: "Test", components: [] });
  },
});
```

---

## Context Menu Types

There are 3 types of context menus:

```js
parrot.ContextMenuType.ChatInput;
parrot.ContextMenuType.User;
parrot.ContextMenuType.Message;
```

---

## Importing Context Menus

Due to the fact that context menus are handled just like slash command, you can just use the slash command importer.

```js
await parrot.ImportSlashCommands(bot, "./SlashCmds");
```

---

## External Context Menus

You can make external context menus like this:

```js
import parrot from "../../../GitHub/parrot.js/src/index.js";

const command = new parrot.ContextMenuCommand({
  name: "wspgang",
  type: parrot.ContextMenuType.User,
  execute: async (interaction) => {
    await interaction.reply({ content: "Wsp", components: [] });
  },
});

export { command };
```

---

!> In order for context menus to show in the apps category in discord you have to register them!

You can register all the context menus you have by running either:

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

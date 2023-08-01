# String Select Menus

Select menus can be created with the `SelectMenu` class. You can create a select menu like this:

```js
const row = new parrot.ActionRow().addComponents(
  new parrot.SelectMenu()
    .setCustomId("revive")
    .setPlaceholder("Select a user to revive")
    .addOptions(
      {
        label: "User 1",
        value: "user1",
        description: "User 1",
        emoji: "👍",
      },
      {
        label: "User 2",
        value: "user2",
        description: "User 2",
        emoji: "👍",
      },
      {
        label: "User 3",
        value: "user3",
        description: "User 3",
        emoji: "👍",
      },
    ),
);
```

---

## Select Menu Events

You can listen for select menu events like this:

```js
let menuFilter = (interaction) => interaction.customId === "revive";
let menuCollector = await interaction.createCollector('selectMenu', menuFilter, { time: 15000 })

menuCollector.on("collect", async (interaction) => {
  await interaction.reply(`You revived ${name}!`);
});
```

?> Note: It's recommended to add a custom id to your select menus. (e.g. `${interaction.user.id}-revive` or something similar like a random number.)

---

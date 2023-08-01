# Buttons

Buttons can be created with the `Button` class. You can create a button like this:

```js
const row = new parrot.ActionRow().addComponents(
  new parrot.Button()
    .setCustomId("revive")
    .setLabel("Revive")
    .setStyle(parrot.ButtonStyle.Primary),
);
```

---

## Button Styles

There are 5 button styles:

```js
parrot.ButtonStyle.Primary;
parrot.ButtonStyle.Secondary;
parrot.ButtonStyle.Success;
parrot.ButtonStyle.Danger;
parrot.ButtonStyle.Link;
```

---

## Button Events

You can listen for button events like this:

```js
let buttonFilter = (interaction) => interaction.customId === "revive";
let buttonCollector = await interaction.createCollector(
  "button",
  buttonFilter,
  { time: 15000 },
);

buttonCollector.on("collect", async (interaction) => {
  await interaction.reply(`You revived ${name}!`);
});
```

?> Note: It's recommended to add a custom id to your buttons. (e.g. `${interaction.user.id}-revive` or something similar like a random number.)

---

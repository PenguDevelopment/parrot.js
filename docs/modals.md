# Modals

Modals can be created with the `Modal` class. You can create a modal like this:

```js
const modal = await new parrot.Modal().setCustomId("revive").setTitle("Revive");
```

---

## Modal Fields

You can add fields to your modal like this:

```js
modal.addFields([
  {
    id: "name",
    title: "What is your name?",
    placeholder: "John Doe",
    style: parrot.ModalStyle.Short,
  },
  {
    id: "age",
    title: "What is your age?",
    placeholder: "18",
    style: parrot.ModalStyle.Short,
  },
  {
    id: "address",
    title: "What is your address?",
    placeholder: "1234 Freddy Fazbear Dr.",
    style: parrot.ModalStyle.Long,
  },
]);
```

!> Make sure to add fields to your modal after you initialize it, otherwise it will not work.

---

## Displaying Modals

You can display modals like this:

```js
await interaction.display(modal);
```

---

## Modal Events

You can listen for modal events like this:

```js
const filter = (interaction) => interaction.customId === "revive";

await interaction
  .collectModalInput({ filter, time: 60000 })
  .then(async (modal) => {
    const fields = modal.fields;
    const name = fields.get("name").value;
    await interaction.reply(`You revived ${name}!`);
  });
```

?> Note: You can also use `const responce = await interaction.collectModalInput({ filter, time: 60000 })` instead of using `.then()`

---

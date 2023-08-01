# Special Functions

In parrot.js, there are some special functions that are either new or replace some functions in discord.js.

---

## interaction.replyEphemeral

This function is the same as `interaction.reply` but it sends an ephemeral message. You can use it like this:

```js
await interaction.replyEphemeral("This is an ephemeral message!");
```

---

## bot.setStatus

This function sets the bot's status. You can use it like this:

```js
bot.setStatus({
  activities: [{ name: "with parrot.js", type: "Playing" }],
  status: "online",
});
```

!> The type is case sensitive.

---

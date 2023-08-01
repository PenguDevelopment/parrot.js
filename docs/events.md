# Events

To initialize events, use the following code:

```js
const events = await bot.initEvents();
```

To create an event, use the following code:

```js
await events.newEvent({
  name: "ready",
  execute: async () => {
    console.log("it ran!");
  },
});
```

---

## Importing Events

To import events, use the following code:

```js
await parrot.ImportEvents(bot, "./Events");
```

---

## External Events

You can make external events like this:

```js
import parrot from "@ratinchat/parrot.js";

const event = new parrot.Event({
  name: "ready",
  execute: async () => {
    console.log("it ran!");
  },
});

export { event };
```

---

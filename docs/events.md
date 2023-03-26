# Events

To initialize events, use the following code:

```js
const events = await bot.initEvents();
```

To create an event, use the following code:

```js
await events.newEvent({
    name: 'ready',
    execute: async () => {
        console.log('it ran!');
    }
});
```

---

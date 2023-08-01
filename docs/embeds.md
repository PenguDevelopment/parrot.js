# Embeds

You can create embeds with the `Embed` class. You can create an embed like this:

```js
let randomColor = Math.floor(Math.random() * 16777215).toString(16);

const embed = new parrot.Embed()
  .setTitle("Revive")
  .setDescription("You have been revived!")
  .setColor(randomColor);
```

---

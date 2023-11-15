# Autocomplete

To add autocomplete to your bot, add the autocomplete function to your slash command:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "why",
  description: "Why is the sky blue?",
  args: [
    {
        "name": "response",
        "description": "Why is the sky blue?",
        "type": parrot.Options.String,
        "autocomplete": true,
        "required": true
    }
  ],
  autocomplete: async (interaction) => {
    const focusedValue = interaction.options.getFocused(true);
    const answer = focusedValue.value;
    if (!answer) {
      return await interaction.sendAutocompleteResults(
        [{ name: "Please type something.", value: "No answer provided!!" }],
      );
    }
    const choices = ['idk', 'im not sure', 'idrk', 'how am i supposed to know'];
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));

    await interaction.respond(
		filtered.map(choice => ({ name: choice, value: choice })),
	);
  },
  execute: async (interaction) => {
    const answer = interaction.options.get("response").value;
    await interaction.reply(`${answer} is incorrect!`);
  },
});

export { command };
```

Thats all you have to do!

---

# Creating A Music Bot

#### Queue and skip will come in v0.7.0 as well as other music sources.

We will create a fully functional music bot that can play songs from youtube, in parrot.js

It will include 4 slash commands including: play, pause, resume, and stop.

## Setup

Let's get started!

Create a index.js file and initialize the bot,

```js
import parrot from "@ratinchat/parrot.js";
import dotenv from "dotenv";
dotenv.config();

const bot = new parrot.Bot({
  token: process.env.TOKEN,
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "MessageContent",
    "GuildVoiceStates",
  ],
});

const commands = await bot.initCommands({
  prefix: "!",
});

const slash = bot.initSlashCommands();
await parrot.ImportSlashCommands(bot, "./SlashCommands");
await slash.registerAll(process.env.TOKEN, bot);
```

!> Make sure to have the GuildVoiceStates intent or the bot will not receive voice events!

---

## Creating the commands

Create a folder called SlashCommands and create a file called play.js

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "play",
  description: "Play a song..?",
  args: [
    {
      name: "query",
      description: "The song to play",
      type: parrot.Options.String,
      autocomplete: true,
      required: true,
    },
  ],
  autocomplete: async (interaction) => {
    const focusedValue = interaction.options.getFocused(true);
    const query = focusedValue.value;
    const results = await interaction.fetchYoutubeQuery(query);
    if (!query) {
      return await interaction.sendAutocompleteResults([
        {
          name: "Please type something to search.",
          value: "No query provided",
        },
      ]);
    }
    if (results) {
      let parsedResults = await interaction.parseYoutubeResults(results);
      await interaction.sendAutocompleteResults(parsedResults);
    }
  },
  execute: async (interaction) => {
    await interaction.deferReply();
    const songId = interaction.options.get("query").value;
    let connection = await interaction.GetConnection();
    if (!connection) {
      connection = await interaction.ConnectChannel();
    }
    const player = await interaction.playYoutubeSong(songId, connection);
    if (!player) return await interaction.followUp("Failed to play song!");
    await interaction.followUp(`Now playing ${player.title}`);
  },
});

export { command };
```

What this code will do is fetch results from youtube and autocomplete them, then play the song that the user chooses.

Now create a file called exit and paste this code:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "exit",
  description: "Disconnect from the the voice channel!",
  execute: async (interaction) => {
    const connection = await interaction.GetConnection();
    if (!connection) return await interaction.reply("Not in a voice channel!");
    await connection.destroy();
    await interaction.reply("Disconnected from the voice channel!");
  },
});

export { command };
```

This code will disconnect the bot from the voice channel.

Now create a file called pause.js and paste this code:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "pause",
  description: "Pause the current song",
  execute: async (interaction) => {
    await interaction.deferReply();
    const connection = await interaction.GetConnection();
    if (!connection)
      return await interaction.followUp("I'm not in a voice channel!");
    const player = await interaction.GetPlayer(connection);
    if (!player) return await interaction.followUp("I'm not playing anything!");
    if (await interaction.checkPaused(player))
      return await interaction.followUp("The song is already paused!");
    player.pause();
    await interaction.followUp("Paused the song!");
  },
});

export { command };
```

This code will pause the current song.

Now create a file called resume.js and paste this code:

```js
import parrot from "@ratinchat/parrot.js";

const command = new parrot.SlashCommand({
  name: "resume",
  description: "Resume the current song",
  execute: async (interaction) => {
    await interaction.deferReply();
    const connection = await interaction.GetConnection();
    if (!connection)
      return await interaction.followUp("I'm not in a voice channel!");
    const player = await interaction.GetPlayer(connection);
    if (!player) return await interaction.followUp("I'm not playing anything!");
    if (!(await interaction.checkPaused(player)))
      return await interaction.followUp("The song is already playing!");
    player.unpause();
    await interaction.followUp("Resumed the song!");
  },
});

export { command };
```

This code will resume the current song.

Now you have a fully functional music bot!

Feel free to customize the messages and include embeds.

---

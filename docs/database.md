# Database

Parrot.js has a built-in database system that allows you to easily store data values for you bot. This is useful for storing things like user settings, guild settings, or anything else you can imagine. The database system is powered by [better-sqlite3](https://www.npmjs.com/package/better-sqlite3).

## Getting Started

To get started with the database system, you need to initialize it in the client options. You can do this like so:

```js
import parrot from "@ratinchat/parrot.js";

import dotenv from "dotenv";
dotenv.config();

const bot = new parrot.Bot({
  token: process.env.TOKEN,
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  database: {
    path: './database.sqlite',
    logging: true,
  }
});
```

This will create a database file called `database.sqlite` in the root directory of your project. You can change the path to whatever you want. The logging option will log all database queries to the console. This is useful for debugging.

## Using Tables

To create a table, you can use the `createTable` method. This method takes two arguments: the name of the table, and the columns of the table. The columns are just an array of strings that represent the columns of the table. Here is an example:

```js
await interaction.db.createTable('currency', ['user', 'guild', 'balance']);
```

You can also check if a table exists using the `tableExists` method. This method takes one argument: the name of the table. Here is an example:

```js
const currencyTable = await interaction.db.tableExists('currency');
if (!currencyTable) {
    await interaction.db.createTable('currency', ['user', 'guild', 'balance']);
}
```

You can also delete a table using the `deleteTable` method. This method takes one argument: the name of the table. Here is an example:

```js
await interaction.db.deleteTable('currency');
```

---

## Handling Data

You can add data to a table using the `add` method. This method takes two arguments: the name of the table, and the data to add. The data should be an object with keys that match the columns of the table. Here is an example:

```js
await interaction.db.add('currency', {
    user: interaction.user.id,
    guild: interaction.guild.id,
    balance: 0,
});
```

You can also get data from a table using the `get` method. This method takes two arguments: the name of the table, and the data to get. The data should be an object with keys that match the columns of the table. Here is an example:

```js
let currencyData = await interaction.db.get('currency', {
    user: interaction.user.id,
    guild: interaction.guild.id,
});
```

You can also update data in a table using the `update` method. This method takes three arguments: the name of the table, the data to update, and the new data. The data should be an object with keys that match the columns of the table. Here is an example:

```js
let currencyData = await interaction.db.get('currency', {
    user: interaction.user.id,
    guild: interaction.guild.id,
});
await interaction.db.update('currency', {
    balance: currencyData.balance + 100,
}, {
    user: interaction.user.id,
    guild: interaction.guild.id,
});
```

You can also delete data from a table using the `delete` method. This method takes two arguments: the name of the table, and the data to delete. The data should be an object with keys that match the columns of the table. Here is an example:

```js
await interaction.db.delete('currency', {
    user: interaction.user.id,
    guild: interaction.guild.id,
});
```
---

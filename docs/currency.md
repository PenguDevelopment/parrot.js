# Database Currency Command

In this guide, we will be creating a currency command that uses the database system to store user balances. This guide assumes you have already read the [database guide](database.md) and set up the database system in your bot as well as a slash command handler.

## Getting Started

First, create a file called currency.js and paste this code:

```js
import { SlashCommand, Options, Embed, ActionRow, Button, ButtonStyle } from "../../../GitHub/parrot.js/src/index.js";

const command = new SlashCommand({
    name: "database",
    description: "Basic Currency System.",
    execute: async (interaction) => {
        await interaction.deferReply();
        // First check if the currency table exists
        // For sake of simplicity we create the table in this file,
        // but normally you would want to create it in the main file.
        const currencyTable = await interaction.db.tableExists('currency');

        if (!currencyTable) {
            // If it doesn't exist, create it
            await interaction.db.createTable('currency', ['user', 'guild', 'balance']);
            console.log('Created currency table');
        }

        // Get the user's currency data
        let currencyData = await interaction.db.get('currency', {
            user: interaction.user.id,
            guild: interaction.guild.id,
        });

        // If the user doesn't have any currency data, create it
        if (!currencyData) {
            await interaction.db.add('currency', {
                user: interaction.user.id,
                guild: interaction.guild.id,
                balance: 0,
            });
            console.log('Created currency data for user');

            // Get the user's currency data again since we couldn't get it before
            currencyData = await interaction.db.get('currency', {
                user: interaction.user.id,
                guild: interaction.guild.id,
            });
        }

        const embed = new Embed()
            .setTitle('Currency System')
            .setDescription(`Your balance is ${currencyData.balance}`)
            .setColor('#2b2d31')

        const row = new ActionRow().addComponents(
            new Button({
                label: 'Add 100',
                style: ButtonStyle.Success,
                customId: 'add',
            }),
            new Button({
                label: 'Remove 100',
                style: ButtonStyle.Danger,
                customId: 'remove',
            }),
        )

        // Send the embed and buttons
        await interaction.followUp({ embeds: [embed], components: [row] });
        
        // Create a button collector
        let buttonFilter = (i) => i.customId === "add" || i.customId === "remove" && i.user.id === interaction.user.id;
        let buttonCollector = await interaction.createCollector(
            "button",
            buttonFilter,
            { time: 1500000000 },
        );

        // Handle the button interactions 
        // For simplicity we use a collector but you can also use an event handler
        // (Ex: Wanting infinite time to click the buttons)
        buttonCollector.on("collect", async (interaction) => {
            await interaction.deferUpdate();
            const action = interaction.customId;
        
            switch (action) {
                case "add":
                    await interaction.db.update('currency', {
                        balance: currencyData.balance + 100,
                    }, {
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                    });
        
                    // Update currencyData with the latest data
                    currencyData = await interaction.db.get('currency', {
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                    });
        
                    await interaction.followUp({ content: `Added 100 to your balance. New balance: ${currencyData.balance}`, components: [row] });
                    break;
        
                case "remove":
                    await interaction.db.update('currency', {
                        balance: currencyData.balance - 100,
                    }, {
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                    });
        
                    // Update currencyData with the latest data
                    currencyData = await interaction.db.get('currency', {
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                    });
        
                    await interaction.followUp({ content: `Removed 100 from your balance. New balance: ${currencyData.balance}`, components: [row] });
                    break;
            }
        });        
    },
});

export { command };
```

This code will create a currency command that uses the database system to store user balances. It will also create a table called currency if it doesn't exist.

Thats it! 😅

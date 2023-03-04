import { BaseClient } from "./Base.js";
import { REST, Routes } from "discord.js";

class Bot extends BaseClient {
    constructor(options) {
        super(options)
        this.commands = [];
        this.slashCommands = [];
    }

    initCommands(options) {
        this.prefix = options.prefix;
        return {
            newCommand: (command) => {
                this.commands.push(command)
            }
        }
    }
    getPing() {
        return this.ws.ping;
    }
    initSlashCommands() {
        return {
            newCommand: (command) => {
                this.slashCommands.push(command)
            },
            registerAll: async (token, bot) => {
                await bot.onReady(async () => {
                    const rest = new REST({ version: '10' }).setToken(token);
                    const commands = [];
                    for (const command of this.slashCommands) {
                        let options = [];
                        if (command.args) {
                            for (const arg of command.args) {
                                let option = {
                                    name: arg.name,
                                    name_localizations: arg.name_localizations,
                                    description: arg.description,
                                    description_localizations: arg.description_localizations,
                                    required: arg.required,
                                    type: arg.type
                                }
                                options.push(option);
                            }
                        }
                        let data = {
                            options: options, 
                            name: command.name,
                            name_localizations: command.name_localizations,
                            description: command.description,
                            description_localizations: command.description_localizations,
                            default_permission: command.default_permission,
                            default_member_permissions: command.default_member_permissions,
                            dm_permission: command.dm_permission,
                        }
                        commands.push(data);
                    }
                    try {
                        console.log(`Started refreshing ${commands.length} application (/) commands.`);
                        let data = await rest.put(
                            Routes.applicationCommands(bot.application.id),
                            { body: commands },
                        );
                        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    });
            }
        }
    }
}

export { Bot };

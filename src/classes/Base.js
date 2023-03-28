import { Client } from "discord.js";
import { convertor } from "../functions/convertor.js";
const [major] = process.version.replace("v", "").split(".")
if (isNaN(Number(major)) || Number(major) < 16) {
    throw new Error(`node.js version must be v16.9.0 or above.`)
}

class BaseClient extends Client {
    constructor(options) {
        super(options)
        this.intents = options.intents
        this.token = options.token
        if (!this.token) {
            throw new Error(`You need a bot token to start your bot.`)
        } else { 
            console.log(`Your bot is now online!`)
            this.on('messageCreate', this.onMessage.bind(this));
            this.on('interactionCreate', this.onInteractionCreate.bind(this));
            this.login(this.token)
        }
    }
    
    async onMessage(message) {
        for (const command of this.commands) {
            const prefix = command.prefix ? command.prefix : this.prefix;
            if (message.content.startsWith(prefix + command.name)) { 
                const cArgs = command.args;

                let mArgs = {};
                let messageContent = message.content.slice(prefix.length + command.name.length).trim();
                if (cArgs) {
                    for (const arg of cArgs) {
                        if (arg.length === 'infinity') {
                            mArgs[arg.name] = messageContent;
                            messageContent = "";
                        } else {
                            // make sure to account for extra spaces
                            const [firstArg, ...rest] = messageContent.split(" ");
                            mArgs[arg.name] = firstArg;
                            messageContent = rest.join(" ");
                        }
                    }
                }

                if (!cArgs)  {
                    message.send = async (content) => {
                        await message.channel.send(content);
                    }
                    message.ButtonCollector = async ({ ...args }) => {
                        if (args.componentType) {
                            const collector = await message.channel.createMessageComponentCollector({ ...args });
                            return collector;
                        } else {
                            const collector = await message.channel.createMessageComponentCollector({ componentType: 2, ...args });
                            return collector;
                        }
                    }
                    message.SelectMenuCollector = async ({ ...args }) => {
                        if (args.componentType) {
                            const collector = await message.channel.createMessageComponentCollector({ ...args });
                            return collector;
                        } else {
                            const collector = await message.channel.createMessageComponentCollector({ componentType: 3, ...args });
                            return collector;
                        }
                    }

                    return command.execute(message);
                }


                const args = {};
                for (let i = 0; i < cArgs.length; i++) {
                    const arg = cArgs[i];
                    const mArg = mArgs[arg.name];
                    for (const arg of cArgs) {
                        if (!mArgs[arg.name]) {
                            return message.reply(`Argument \`${arg.name}\` is required.`)
                        }
                    }
                    if (mArg) {
                        if (arg.type === 7) {
                            const parsedChannel = mArg.replace(/<#|>/g, "");
                            const channel = this.getChannel(parsedChannel);
                            if (!channel) {
                                return message.reply(`Channel argument \`${mArg}\` does not exist.`)
                            }
                            args[arg.name] = channel;
                        } else if (arg.type === 6) {
                            const id = mArg.replace(/<@!?|>/g, "");
                            const user = this.getUser(id);
                            if (!user) {
                                return message.reply(`User argument \`${mArg}\` does not exist.`)
                            }
                            args[arg.name] = user;
                        } else if (arg.type === 8) {
                            const parsedRole = mArg.replace(/<@&|>/g, "");
                            const role = this.getRole(parsedRole);
                            if (!role) {
                                return message.reply(`Role argument \`${mArg}\` does not exist.`)
                            }
                            args[arg.name] = role;
                        } else if (arg.type === 10) {
                            if (isNaN(+mArg) || !Number.isInteger(+mArg)) {
                                return message.reply(`Number argument \`${arg.name}\` is either missing or of an invalid type.`);
                            }
                            args[arg.name] = mArg;
                        } else if (arg.type === 3) {
                            args[arg.name] = mArg;
                        } else if (arg.type === 5) {
                            args[arg.name] = mArg === "true" ? true : false;
                        } else if (arg.type === 12) {
                            const parsedEmoji = mArg.replace(/<:|>/g, "");
                            const emoji = this.getEmoji(parsedEmoji);
                            if (!emoji) {
                                return message.reply(`Emoji argument \`${mArg}\` does not exist.`)
                            }
                            args[arg.name] = emoji;
                        } else {
                            return message.reply(`Argument \`${arg.name}\` is of an invalid type.`)
                        }
                    }
                }

                message.send = async (content) => {
                    await message.channel.send(content);
                }
                message.ButtonCollector = async ({ ...args }) => {
                    const filter = args.filter ? args.filter : (i) => i.isButton();
                    const collector = message.channel.createMessageComponentCollector({ filter, ...args });
                    return collector;
                }
                message.SelectMenuCollector = async ({ ...args }) => {
                    const filter = args.filter ? args.filter : (i) => i.isSelectMenu(); 
                    const collector = message.channel.createMessageComponentCollector({ filter, ...args });
                    return collector;
                }
                
                await command.execute(message, args);
            }
        }
    }
    getChannel(id) {
        return this.channels.cache.get(id);
    }
    getUser(id) {
        return this.users.cache.get(id);
    }
    getRole(id) {
        return this.roles.cache.get(id);
    }
    getEmoji(id) {
        return this.emojis.cache.get(id);
    }
    async onInteractionCreate(interaction) {
        for (const slash of this.slashCommands) {
            if (slash.name === interaction.commandName) {
                if (slash.permissions) {
                    const member = interaction.member;
                    if (!member) {
                        return interaction.reply(`This command can only be ran in a guild.`)
                    }
                    const permissions = member.permissions;
                    for (const permission of slash.permissions) {
                        const permissionName = await convertor(permission);
                        if (!permissions.has(permission)) {
                            return interaction.reply({ content: `:warning: This command requires the \`${permissionName}\` permission.`, ephemeral: true })
                        }
                    }
                }
                const cArgs = slash.args;

                if (!cArgs) {
                    interaction.replyEphemeral = async (...args) => {
                        await interaction.reply(...args);
                    }
                    interaction.ButtonCollector = async ({ ...args }) => {
                        if (args.componentType) {
                            const collector = await interaction.channel.createMessageComponentCollector({ ...args });
                            return collector;
                        } else {
                            const collector = await interaction.channel.createMessageComponentCollector({ componentType: 2, ...args });
                            return collector;
                        }
                    }
                    interaction.SelectMenuCollector = async ({ ...args }) => {
                        if (args.componentType) {
                            const collector = await interaction.channel.createMessageComponentCollector({ ...args });
                            return collector;
                        } else {
                            const collector = await interaction.channel.createMessageComponentCollector({ componentType: 3, ...args });
                            return collector;
                        }
                    }

                    interaction.collectModalInput = async ({ ...args }) => {
                        const collector = await interaction.awaitModalSubmit({ ...args }).catch((error) => {
                            console.log(error);
                        });
                        collector.fields = collector.fields.fields;
                        return collector;
                    }

                    interaction.display = async (modal) => {
                        await interaction.showModal(modal);
                    }

                    interaction.getSubcommand = async (name) => {
                        const subcommand = await interaction.options.getSubcommand(name);
                        return subcommand;
                    }

                    return slash.execute(interaction);
                }

                const args = {};
                for (const arg of cArgs) {
                    const option = await interaction.options.get(arg.name);

                    if (option) {
                    if (arg.type === 7) {
                        args[arg.name] = option.channel;
                    } else if (arg.type === 6) {
                        args[arg.name] = option.user;
                    } else if (arg.type === 8) {
                        args[arg.name] = option.role;
                    } else if (arg.type === 10) {
                        args[arg.name] = option.value;
                    } else if (arg.type === 3) {
                        args[arg.name] = option.value;
                    } else if (arg.type === 5) {
                        args[arg.name] = option.value;
                    } else if (arg.type === 9) {
                        args[arg.name] = option.role ? option.role : option.user;
                    } else {
                        return interaction.reply({ content: `Argument \`${arg.name}\` is of an invalid type.`, ephemeral: true });
                    }
                } else {
                    args[arg.name] = null;
                }
                }                
                interaction.replyEphemeral = async (...args) => {
                    const replyOptions = args[args.length - 1];
                    if (replyOptions && typeof replyOptions === 'object') {
                      replyOptions.ephemeral = true;
                    } else {
                        switch (typeof args[0]) {
                            case "string":
                                args = [{ content: args[0], ephemeral: true }]
                                break;
                            case "object":
                                args = [{ embeds: args, ephemeral: true }]
                                break;
                            default:
                                args = [{ content: args, ephemeral: true }]
                                break;
                        }
                    }
                    await interaction.reply(...args);
                };
                interaction.ButtonCollector = async ({ ...args }) => {
                    if (args.componentType) {
                        const collector = await interaction.channel.createMessageComponentCollector({ ...args });
                        return collector;
                    } else {
                        const collector = await interaction.channel.createMessageComponentCollector({ componentType: 2, ...args });
                        return collector;
                    }
                }
                interaction.SelectMenuCollector = async ({ ...args }) => {
                    if (args.componentType) {
                        const collector = await interaction.channel.createMessageComponentCollector({ ...args });
                        return collector;
                    } else {
                        const collector = await interaction.channel.createMessageComponentCollector({ componentType: 3, ...args });
                        return collector;
                    }
                }
                interaction.collectModalInput = async ({ ...args }) => {
                    const collector = await interaction.awaitModalSubmit({ ...args }).catch((error) => {
                        console.log(error);
                    });
                    collector.fields = collector.fields.fields;
                    return collector;
                }

                interaction.display = async (modal) => {
                    await interaction.showModal(modal);
                }

                interaction.getSubcommand = async (name) => {
                    const subcommand = await interaction.options.getSubcommand(name);
                    return subcommand;
                }
                
                return slash.execute(interaction, args);
            }
        }
    }
    onReady(callback) {
        this.on('ready', callback)
    }
}

export { BaseClient };

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
                const mArgs = message.content.slice(prefix.length + command.name.length).trim().split(/ +/g);
                const cArgs = command.args;
                if (!cArgs)  {
                    message.send = async (content) => {
                        await message.channel.send(content);
                    }
                    message.ButtonCollector = async ({ ...args }) => {
                        console.log(args);
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

                if (mArgs.length !== cArgs.length) {
                    for (const arg of cArgs) {
                        if (arg.required && !args[arg.name]) {
                            return message.reply(`Argument \`${arg.name}\` is required.`)
                        }
                    }
                }
            
                if (mArgs.length > cArgs.length) {
                    return message.reply(`Too many arguments were provided.`)
                }

                const args = {};
                for (let i = 0; i < cArgs.length; i++) {
                    const arg = cArgs[i];
                    const mArg = mArgs[i];
                
                    if (mArg) {
                        if (arg.type === 7) {
                            const parsedChannel = mArg.replace(/<#|>/g, "");
                            const channel = this.getChannel(parsedChannel);
                            if (!channel) {
                                return message.reply(`Channel argument \`${mArg}\` does not exist.`)
                            }
                            args[arg.name] = channel;
                        } else if (arg.type === 6) {
                            const parsedUser = mArg.replace(/<@|>/g, "");
                            const user = this.getUser(parsedUser);
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
                    } else {
                        if (arg.required) {
                            return message.reply(`Argument \`${arg.name}\` is required.`)
                        } else {
                            args[arg.name] = null;
                        }
                    }
                }

                message.send = async (content) => {
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
                    await message.channel.send(content);
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
                    return slash.execute(interaction);
                }

                const args = {};
                for (const arg of cArgs) {
                    const option = interaction.options[arg.name];
                    if (!option) {
                        if (arg.required) {
                            return interaction.reply({ content: `Required argument \`${arg.name}\` is missing.`, ephemeral: true });
                        } else {
                            args[arg.name] = null;
                            continue;
                        }
                    }
                
                    if (arg.type === 7) {
                        const channel = this.getChannel(option.channelId);
                        if (!channel) {
                            return interaction.reply({ content: `Channel argument \`${option.name}\` does not exist.`, ephemeral: true });
                        }
                        args[arg.name] = channel;
                    } else if (arg.type === 6) {
                        const user = this.getUser(option.userId);
                        if (!user) {
                            return interaction.reply({ content: `User argument \`${option.name}\` does not exist.`, ephemeral: true });
                        }
                        args[arg.name] = user;
                    } else if (arg.type === 8) {
                        const role = this.getRole(option.roleId);
                        if (!role) {
                            return interaction.reply({ content: `Role argument \`${option.name}\` does not exist.`, ephemeral: true });
                        }
                        args[arg.name] = role;
                    } else if (arg.type === 10) {
                        const number = option.value;
                        if (isNaN(number)) {
                            return interaction.reply({ content: `Number argument \`${arg.name}\` must be a number.`, ephemeral: true });
                        }
                        args[arg.name] = number;
                    } else if (arg.type === 3) {
                        args[arg.name] = option.value;
                    } else if (arg.type === 5) {
                        args[arg.name] = option.value;
                    } else if (arg.type === 12) {
                        const emoji = this.getEmoji(option.emojiId);
                        if (!emoji) {
                            return interaction.reply({ content: `Emoji \`${option.name}\` does not exist.`, ephemeral: true });
                        }
                        args[arg.name] = emoji;
                    } else {
                        return interaction.reply({ content: `Argument \`${arg.name}\` is of an invalid type.`, ephemeral: true });
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
                return slash.execute(interaction, args);
            }
        }
    }
    onReady(callback) {
        this.on('ready', callback)
    }
}

export { BaseClient };

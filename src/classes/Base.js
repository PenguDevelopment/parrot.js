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
                    return command.execute(message);
                }

                if (mArgs.length !== cArgs.length) {
                    for (const arg of cArgs) {
                        if (arg.required) {
                            return message.reply(`Argument \`${arg.name}\` is required.`)
                        }
                    }
                }

                if (mArgs.length > cArgs.length) {
                    return message.reply(`Too many arguments were provided.`)
                }

                const args = {};
                for (let i = 0; i < mArgs.length; i++) {
                    const arg = cArgs[i];
                    if (arg.type === 7) {
                        const parsedChannel = mArgs[i].replace(/<#|>/g, "");
                        const channel = this.getChannel(parsedChannel);
                        if (!channel) {
                            return message.reply(`Channel argument \`${mArgs[i]}\` does not exist.`)
                        }
                        args[arg.name] = channel;
                    } else if (arg.type === 6) {
                        const parsedUser = mArgs[i].replace(/<@|>/g, "");
                        const user = this.getUser(parsedUser);
                        if (!user) {
                            return message.reply(`User argument \`${mArgs[i]}\` does not exist.`)
                        }
                        args[arg.name] = user;
                    } else if (arg.type === 8) {
                        const parsedRole = mArgs[i].replace(/<@&|>/g, "");
                        const role = this.getRole(parsedRole);
                        if (!role) {
                            return message.reply(`Role argument \`${mArgs[i]}\` does not exist.`)
                        }
                        args[arg.name] = role;
                    } else if (arg.type === 10) {
                        if (isNaN(+mArgs[i]) || !Number.isInteger(+mArgs[i])) {
                            console.log(mArgs[i])
                            console.log(+mArgs[i])
                            return message.reply(`Number argument \`${arg.name}\` is either missing or of an invalid type.`);
                        }
                        args[arg.name] = mArgs[i];
                    } else if (arg.type === 3) {
                        args[arg.name] = mArgs[i];
                    } else if (arg.type === 5) {
                        args[arg.name] = mArgs[i] === "true" ? true : false;
                    } else if (arg.type === 12) {
                        const parsedEmoji = mArgs[i].replace(/<:|>/g, "");
                        const emoji = this.getEmoji(parsedEmoji);
                        if (!emoji) {
                            return message.reply(`Emoji argument \`${mArgs[i]}\` does not exist.`)
                        }
                        args[arg.name] = emoji;
                    } else {
                        return message.reply(`Argument \`${arg.name}\` is of an invalid type.`)
                    }
                }

                message.send = async (content) => {
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
                    return slash.execute(interaction);
                }

                const args = {};
                for (const arg of cArgs) {
                    if (arg.type === 7) {
                        const channel = this.getChannel(interaction.options.getChannel(arg.name).id);
                        if (!channel) {
                            return interaction.reply({ content: `Channel argument \`${interaction.options.getChannel(arg.name).name}\` does not exist.`, ephemeral: true })
                        }
                        args[arg.name] = channel;
                    } else if (arg.type === 6) {
                        const user = this.getUser(interaction.options.getUser(arg.name).id);
                        if (!user) {
                            return interaction.reply({ content: `User argument \`${interaction.options.getUser(arg.name).username}\` does not exist.`, ephemeral: true })
                        }
                        args[arg.name] = user;
                    } else if (arg.type === 8) {
                        const role = this.getRole(interaction.options.getRole(arg.name).id);
                        if (!role) { // parrot you know there is a session chat?
                            return interaction.reply({ content: `Role argument \`${interaction.options.getRole(arg.name).name}\` does not exist.`, ephemeral: true })
                        }
                        args[arg.name] = role;
                    } else if (arg.type === 10) {
                        const number = interaction.options.getNumber(arg.name);
                        if (isNaN(number)) {
                            return interaction.reply({ content: `Number argument \`${arg.name}\` must be a number.`, ephemeral: true })
                        }
                        args[arg.name] = number;
                    } else if (arg.type === 3) {
                        args[arg.name] = interaction.options.getString(arg.name);
                    } else if (arg.type === 5) {
                        args[arg.name] = interaction.options.getBoolean(arg.name);
                    } else if (arg.type === 12) {
                        const emoji = this.getEmoji(interaction.options.getEmoji(arg.name).id);
                        if (!emoji) {
                            return interaction.reply({ content: `Emoji \`${interaction.options.getEmoji(arg.name).name}\` does not exist.`, ephemeral: true })
                        }
                        args[arg.name] = emoji;
                    } else {
                        return interaction.reply({ content: `Argument \`${arg.name}\` is of an invalid type.`, ephemeral: true })
                    }
                }
                // you can make it like this
                // pretty sure this will account for args and everything.
                interaction.replyEphemeral = async (...args) => {
                    const replyOptions = args[args.length - 1]; // extract reply options, if any
                    if (replyOptions && typeof replyOptions === 'object') {
                      replyOptions.ephemeral = true; // set ephemeral to true
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
                };// what you say?
                // 
                // interaction.reply = async (args) => {
                //     if (typeof args == discord.Embed) 
                   
                //     // maybe if you loop
                //     interaction.reply(embed, row)
                    
                // }
                // idk if this workaround will work lol.
                return slash.execute(interaction, args);
            }
        }
    }
    onReady(callback) {
        this.on('ready', callback)
    }
}

export { BaseClient };

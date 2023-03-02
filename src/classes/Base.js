import { Client } from "discord.js";
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
            throw new Error(`Token is required.`)
        } else { 
            console.log(`Successfully started bot!`)
            this.on('messageCreate', this.onMessage.bind(this));
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
                            return message.reply(`The argument \`${arg.name}\` is required.`)
                        }
                    }
                }

                if (mArgs.length > cArgs.length) {
                    return message.reply(`Too many arguments.`)
                }

                const args = {};
                for (let i = 0; i < mArgs.length; i++) {
                    const arg = cArgs[i];
                    if (arg.type === 0) {
                        const parsedChannel = mArgs[i].replace(/<#|>/g, "");
                        const channel = this.getChannel(parsedChannel);
                        if (!channel) {
                            return message.reply(`The channel \`${mArgs[i]}\` does not exist.`)
                        }
                        args[arg.name] = channel;
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
}

export { BaseClient };

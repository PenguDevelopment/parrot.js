import { BaseClient } from "./Base.js";

class Bot extends BaseClient {
    constructor(options) {
        super(options)
        this.commands = [];
    }

    initCommands(options) {
        this.prefix = options.prefix;
        return {
            newCommand: (command) => {
                this.commands.push(command)
            }
        }
    }
}


export { Bot };
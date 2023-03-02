import { Bot } from './classes/bot.js';
import { ImportCommands } from './functions/importCommands.js';
import { TextCommand } from './classes/textCommand.js';

const parrot = {
    Bot,
    Options: {
        CHANNEL: 0,
    },
    getPing: () => {
        return Math.round(Date.now() - parrot.start);
    },
    ImportCommands,
    TextCommand
};
export default parrot;
import { Bot } from './classes/bot.js';
import { ImportCommands } from './functions/importCommands.js';
import { TextCommand } from './classes/textCommand.js';
import checkUpdate from './functions/checkUpdate.js';

checkUpdate();

const parrot = {
    Bot,
    Options: {
        CHANNEL: 0,
        USER: 1,
        ROLE: 2,
        NUMBER: 3,
        STRING: 4,
        BOOLEAN: 5,
        EMOJI: 6,
    },
    getPing: () => {
        return Math.round(Date.now() - parrot.start);
    },
    ImportCommands,
    TextCommand
};
export default parrot;
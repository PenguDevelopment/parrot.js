import { Bot } from './classes/bot.js';
import { ImportCommands } from './functions/importCommands.js';
import { TextCommand } from './classes/textCommand.js';
import { SlashCommand } from './classes/slashCommand.js';
import checkUpdate from './functions/checkUpdate.js';
import { EmbedBuilder } from 'discord.js';
import { ActionRowBuilder } from 'discord.js';
import { ButtonBuilder } from 'discord.js';
import { StringSelectMenuBuilder  } from 'discord.js';
import { ImportSlashCommands } from './functions/importSlashCommands.js';
import { PermissionsBitField } from 'discord.js';
checkUpdate();

const parrot = {
    Bot,
    Options: {
        USER: 6,
        MENTIONABLE: 9,
        CHANNEL: 7,
        ROLE: 8,
        STRING: 3,
        INTEGER: 4,
        BOOLEAN: 5,
        NUMBER: 10,
        ATTACHMENT: 11,
        SUB_COMMAND: 1,
        SUB_COMMAND_GROUP: 2,
        EMOJI: 12,
    },
    ImportCommands,
    ImportSlashCommands,
    TextCommand,
    Embed: EmbedBuilder,
    ActionRow: ActionRowBuilder,
    Button: ButtonBuilder,
    SelectMenu: StringSelectMenuBuilder,
    SlashCommand,
    Permissions: PermissionsBitField.Flags,
};
export default parrot;

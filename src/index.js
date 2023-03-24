import { Bot } from './classes/Bot.js';
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
import { Modal } from './classes/modal.js';

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
    ButtonStyle: {
        Primary: 1,
        Secondary: 2,
        Success: 3,
        Danger: 4,
        Link: 5,
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
    Modal,
    ModalStyle: {
        Short: 1,
        Long: 2,
    },
};
export default parrot;

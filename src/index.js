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
import { Modal } from './classes/Modal.js';

checkUpdate();

const parrot = {
    Bot,
    Options: {
        User: 6,
        Mentionable: 9,
        Channel: 7,
        Role: 8,
        String: 3,
        Integer: 4,
        Boolean: 5,
        Number: 10,
        Attachment: 11,
        SubCommand: 1,
        SubCommandGroup: 2,
        Emoji: 12,
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

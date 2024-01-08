import { Bot } from "./classes/Bot.js";
import { ImportCommands } from "./functions/importCommands.js";
import { TextCommand } from "./classes/textCommand.js";
import { SlashCommand } from "./classes/slashCommand.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  PermissionsBitField,
} from "discord.js";
import { ImportSlashCommands } from "./functions/importSlashCommands.js";
import { ImportEvents } from "./functions/importEvents.js";
import { Event } from "./classes/event.js";
import { Modal } from "./classes/Modal.js";
import { ContextMenuCommand } from "./classes/ContextMenus.js";

export {
  Bot,
  ImportCommands,
  TextCommand,
  SlashCommand,
  EmbedBuilder as Embed,
  ActionRowBuilder as ActionRow,
  ButtonBuilder as Button,
  StringSelectMenuBuilder as SelectMenu,
  PermissionsBitField as Permissions,
  ImportSlashCommands,
  ImportEvents,
  Event,
  Modal,
  ContextMenuCommand,
};

export const Options = {
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
};

export const ButtonStyle = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
};

export const ModalStyle = {
  Short: 1,
  Long: 2,
};

export const ContextMenuType = {
  ChatInput: 1,
  User: 2,
  Message: 3,
};

const parrot = {
  Bot,
  ImportCommands,
  TextCommand,
  SlashCommand,
  Embed: EmbedBuilder,
  ActionRow: ActionRowBuilder,
  Button: ButtonBuilder,
  SelectMenu: StringSelectMenuBuilder,
  Permissions: PermissionsBitField,
  ImportSlashCommands,
  ImportEvents,
  Event,
  Modal,
  ContextMenuCommand,
  Options,
  ButtonStyle,
  ModalStyle,
  ContextMenuType,
};

export default parrot;

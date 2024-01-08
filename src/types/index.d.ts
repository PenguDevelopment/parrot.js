// Some basic types for the library
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  PermissionsBitField,
} from "discord.js";

declare const Options: {
  User: number;
  Mentionable: number;
  Channel: number;
  Role: number;
  String: number;
  Integer: number;
  Boolean: number;
  Number: number;
  Attachment: number;
  SubCommand: number;
  SubCommandGroup: number;
  Emoji: number;
};

declare const ButtonStyle: {
  Primary: number;
  Secondary: number;
  Success: number;
  Danger: number;
  Link: number;
};

declare const ModalStyle: {
  Short: number;
  Long: number;
};

declare const ContextMenuType: {
  ChatInput: number;
  User: number;
  Message: number;
};

declare const ImportSlashCommands: any; // Replace with the correct type if available
declare const ImportEvents: any; // Replace with the correct type if available

declare class Event {
  constructor(options: { name: string; execute: Function });
}

declare class TextCommand {
  constructor(options: { name: string; description: string; args: string[]; execute: Function });
}

declare class SlashCommand {
  constructor(options: {
    name: string;
    permission: any; // Replace with the correct type later
    name_localizations: string[];
    description: string;
    description_localizations: string[];
    args: string[];
    execute: Function;
    autocomplete: boolean;
    subcommands: any[]; // Replace with the correct type later
    subcommandGroups: any[]; // Replace with the correct type later
    type: number;
  });
}

declare class Modal {
  constructor();
  async addFields(fields: {
    id?: string;
    title?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    style?: number;
  }[]): Promise<void>;
}

declare class ContextMenuCommand {
  constructor(options: {
    name: string;
    permission: any; // Replace with the correct type later
    name_localizations: string[];
    description: string;
    description_localizations: string[];
    execute: Function;
    args: string[];
    type: number;
  });
}

export {
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
  Options,
  ButtonStyle,
  ModalStyle,
  ContextMenuType,
};

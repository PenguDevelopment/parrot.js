declare module "@ratinchat/parrot.js" {
  export interface Bot {
    setStatus(options: any): void;
    initEvents(): any;
    initCommands(options: any): any;
    getPing(): number;
    initSlashCommands(): any;
  }

  export interface TextCommand {
    method1(): void;
    method2(): void;
    property1: string;
  }

  export interface SlashCommand {
    method1(): void;
    method2(): void;
    property1: string;
  }

  export interface Event {
    method1(): void;
    method2(): void;
    property1: string;
  }

  export interface Modal {
    method1(): void;
    method2(): void;
    property1: string;
  }

  export type ImportCommands = (commands: any[]) => void;
  export type ImportSlashCommands = (commands: any[]) => void;
  export type ImportEvents = (events: any[]) => void;
  export type CheckUpdate = () => void;

  // export interface Parrot {
  //   Bot: Bot;
  //   Options: ParrotOptions;
  // }

  // enum ParrotOptions {
  //   User = 6,
  //   Mentionable = 9,
  //   Channel = 7,
  //   Role = 8,
  //   String = 3,
  //   Integer = 4,
  //   Boolean = 5,
  //   Number = 10,
  //   Attachment = 11,
  //   SubCommand = 1,
  //   SubCommandGroup = 2,
  //   Emoji = 12,
  // }
  // Improved typescript coming soon ;)
}
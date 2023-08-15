declare module "parrot.js" {
  export interface Bot {
    setStatus(options: any): void;
    initEvents(): any;
    initCommands(options: any): any;
    getPing(): number;
    initSlashCommands(): any;
    method1(): void;
    method2(): void;
    property1: string;
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

  // Define function types for the functions in the library
  export type ImportCommands = (commands: any[]) => void;
  export type ImportSlashCommands = (commands: any[]) => void;
  export type ImportEvents = (events: any[]) => void;
  export type CheckUpdate = () => void;
}

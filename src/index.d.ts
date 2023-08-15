declare module "parrot.js" {
  export interface Bot {
    setStatus(options: any): void;
    initEvents(): any;
    initCommands(options: any): any;
    getPing(): number;
    initSlashCommands(): any;
    // Define the rest of the properties and methods of the Bot class
  }

  export interface TextCommand {
    // Define the properties and methods of the TextCommand class
  }

  export interface SlashCommand {
    // Define the properties and methods of the SlashCommand class
  }

  export interface Event {
    // Define the properties and methods of the Event class
  }

  export interface Modal {
    // Define the properties and methods of the Modal class
  }

  // Define function types for the functions in the library
  export type ImportCommands = (commands: any[]) => void;
  export type ImportSlashCommands = (commands: any[]) => void;
  export type ImportEvents = (events: any[]) => void;
  export type CheckUpdate = () => void;
}

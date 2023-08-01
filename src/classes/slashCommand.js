class SlashCommand {
  constructor(options) {
    this.name = options.name;
    this.permission = options.permission;
    this.name_localizations = options.name_localizations;
    this.description = options.description;
    this.description_localizations = options.description_localizations;
    this.args = options.args;
    this.execute = options.execute;
    this.subcommands = options.subcommands;
    this.subcommandGroups = options.subcommandGroups;
  }
}

export { SlashCommand };

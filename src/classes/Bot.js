import { BaseClient } from "./Base.js";
import { Collection, REST, Routes } from "discord.js";
import { logSlashCommandStatus } from "../functions/boxes.js";

class Bot extends BaseClient {
  constructor(options) {
    super(options);
    this.textCommands = [];
    this.slashCommands = [];
    this.contextMenus = [];
    this.commands = new Collection();
  }

  setStatus(options) {
    const status = [];
    for (let i = 0; i < options.activities.length; i++) {
      const type = options.activities[i].type;
      switch (type) {
        case "Playing":
          options.type = 0;
          break;
        case "Streaming":
          options.type = 1;
          break;
        case "Listening":
          options.type = 2;
          break;
        case "Watching":
          options.type = 3;
          break;
        case "Custom":
          options.type = 4;
          break;
        case "Competing":
          options.type = 5;
          break;
        default:
          options.type = 0;
          break;
      }
      const activity = {
        name: options.activities[i].name,
        type: options.type,
        url: options.activities[i].url,
      };
      status.push(activity);
    }
    this.user.setPresence({
      activities: status,
      status: options.status,
    });
  }

  initEvents() {
    return {
      newEvent: (event) => {
        this.on(event.name, event.execute);
      },
    };
  }

  initCommands(options) {
    this.prefix = options.prefix;
    return {
      newCommand: (command) => {
        this.textCommands.push(command);
      },
    };
  }

  getPing() {
    return this.ws.ping;
  }

  initSlashCommands() {
    return {
      newCommand: (command) => {
        this.slashCommands.push(command);
        this.commands.set(command.name, command);
      },
      newContextMenu: (contextMenu) => {
        this.contextMenus.push(contextMenu);
      },
      registerAll: async (token, bot) => {
        const combinedCommands = [];
        for (const command of this.slashCommands) {
          combinedCommands.push(command);
        }
        for (const command of this.contextMenus) {
          combinedCommands.push(command);
        }
        await bot.onReady(async () => {
          const rest = new REST().setToken(token);
          const contextCommands = [];
          for (const command of combinedCommands) {
            const options = [];
            if (command.args) {
              for (const arg of command.args) {
                const option = {
                  name: arg.name,
                  name_localizations: arg.name_localizations,
                  description: arg.description,
                  description_localizations: arg.description_localizations,
                  required: arg.required,
                  type: arg.type,
                  autocomplete: arg.autocomplete,
                  choices: arg.choices,
                };
                options.push(option);
              }
            } else if (command.subcommands) {
              for (const subcommand of command.subcommands) {
                const subcommandOptions = [];
                if (subcommand.args) {
                  for (const arg of subcommand.args) {
                    const option = {
                      name: arg.name,
                      name_localizations: arg.name_localizations,
                      description: arg.description,
                      description_localizations: arg.description_localizations,
                      required: arg.required,
                      type: arg.type,
                      autocomplete: arg.autocomplete,
                      choices: arg.choices,
                    };
                    subcommandOptions.push(option);
                  }
                }
                const option = {
                  name: subcommand.name,
                  name_localizations: subcommand.name_localizations,
                  description: subcommand.description,
                  description_localizations:
                    subcommand.description_localizations,
                  type: 1,
                  options: subcommandOptions,
                  choices: subcommand.choices,
                };
                options.push(option);
              }
            }
            let data;
            if (command.subcommandGroups) {
              const options = [];
              for (const subcommandGroup of command.subcommandGroups) {
                const subcommandGroupOptions = [];
                for (const subcommand of subcommandGroup.subcommands) {
                  const subcommandOptions = [];
                  if (subcommand.args) {
                    for (const arg of subcommand.args) {
                      const option = {
                        name: arg.name,
                        name_localizations: arg.name_localizations,
                        description: arg.description,
                        description_localizations:
                          arg.description_localizations,
                        required: arg.required,
                        type: arg.type,
                        choices: arg.choices,
                      };
                      subcommandOptions.push(option);
                    }
                  }
                  const option = {
                    name: subcommand.name,
                    name_localizations: subcommand.name_localizations,
                    description: subcommand.description,
                    description_localizations:
                      subcommand.description_localizations,
                    type: 1,
                    options: subcommandOptions,
                    choices: subcommand.choices,
                  };
                  subcommandGroupOptions.push(option);
                }
                const option = {
                  name: subcommandGroup.name,
                  name_localizations: subcommandGroup.name_localizations,
                  description: subcommandGroup.description,
                  description_localizations:
                    subcommandGroup.description_localizations,
                  type: 2,
                  options: subcommandGroupOptions,
                };
                options.push(option);
              }
              data = {
                options,
                name: command.name,
                type: command.type,
                name_localizations: command.name_localizations,
                description: command.description,
                description_localizations: command.description_localizations,
                default_permission: command.default_permission,
                default_member_permissions: command.default_member_permissions,
                dm_permission: command.dm_permission,
              };
            } else {
              data = {
                options,
                name: command.name,
                type: command.type,
                name_localizations: command.name_localizations,
                description: command.description,
                description_localizations: command.description_localizations,
                default_permission: command.default_permission,
                default_member_permissions: command.default_member_permissions,
                dm_permission: command.dm_permission,
              };
            }
            contextCommands.push(data);
            // this.commands.set(command.name, command);
          }
          try {
            const data = await rest.put(
              Routes.applicationCommands(bot.application.id),
              { body: contextCommands },
            );
            logSlashCommandStatus(data);
          } catch (error) {
            console.error(error);
          }
        });
      },
    };
  }
}

export { Bot };

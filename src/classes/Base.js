import { Client } from "discord.js";
import {
  joinVoiceChannel,
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  AudioPlayerStatus,
} from "@discordjs/voice";
import { convertor } from "../functions/convertor.js";
import { checkUpdate, startUpLog } from "../functions/boxes.js";
import { search, stream } from "play-dl";

const [major] = process.version.replace("v", "").split(".");
if (isNaN(Number(major)) || Number(major) < 16) {
  throw new Error("node.js version must be v16.9.0 or above.");
}

class BaseClient extends Client {
  constructor(options) {
    super(options);
    this.intents = options.intents;
    this.token = options.token;
    this.removeBotStartupLog = options.removeBotStartupLog;
    this.removeMessageArgsCheckMessage = options.removeMessageArgsCheckMessage;
    this.removeInteractionArgsCheckMessage =
      options.removeInteractionArgsCheckMessage;
    if (!this.token) {
      throw new Error(`You need a bot token to start your bot.`);
    } else {
      if (this.removeBotStartupLog !== true) {
        startUpLog();
      }
      checkUpdate();
      this.on("messageCreate", this.onMessage.bind(this));
      this.on("interactionCreate", this.onInteractionCreate.bind(this));
      this.login(this.token);
    }
  }

  async onMessage(message) {
    message.send = async (content) => {
      await message.channel.send(content);
    };
    message.createCollector = async (type, filter, options) => {
      if (type === "button") {
        const collector = await message.channel.createMessageComponentCollector(
          {
            componentType: 2,
            filter,
            ...options,
          },
        );
        return collector;
      } else if (type === "selectMenu") {
        const collector = await message.channel.createMessageComponentCollector(
          {
            componentType: 3,
            filter,
            ...options,
          },
        );
        return collector;
      } else {
        throw new Error(
          `Invalid collector type. Valid types are 'button' and 'selectMenu'.`,
        );
      }
    };
    for (const command of this.commands) {
      const prefix = command.prefix ? command.prefix : this.prefix;
      if (message.content.startsWith(prefix + command.name)) {
        const cArgs = command.args;

        const mArgs = {};
        let messageContent = message.content
          .slice(prefix.length + command.name.length)
          .trim();
        if (cArgs) {
          for (const arg of cArgs) {
            if (arg.length === "infinity") {
              mArgs[arg.name] = messageContent;
              messageContent = "";
            } else {
              const [firstArg, ...rest] = messageContent.split(" ");
              mArgs[arg.name] = firstArg;
              messageContent = rest.join(" ");
            }
          }
        }

        if (!cArgs) {
          return command.execute(message);
        }

        const args = {};
        for (let i = 0; i < cArgs.length; i++) {
          const arg = cArgs[i];
          const mArg = mArgs[arg.name];
          for (const arg of cArgs) {
            if (!mArgs[arg.name] && !this.removeMessageArgsCheckMessage) {
              return message.reply(`Argument \`${arg.name}\` is required.`);
            }
          }
          if (mArg) {
            if (arg.type === 7) {
              const parsedChannel = mArg.replace(/<#|>/g, "");
              const channel = this.getChannel(parsedChannel);
              if (!channel && !this.removeMessageArgsCheckMessage) {
                return message.reply(
                  `Channel argument \`${mArg}\` does not exist.`,
                );
              }
              args[arg.name] = channel;
            } else if (arg.type === 6) {
              const id = mArg.replace(/<@!?|>/g, "");
              const user = this.getUser(id);
              if (!user && !this.removeMessageArgsCheckMessage) {
                return message.reply(
                  `User argument \`${mArg}\` does not exist.`,
                );
              }
              args[arg.name] = user;
            } else if (arg.type === 8) {
              const parsedRole = mArg.replace(/<@&|>/g, "");
              const role = this.getRole(parsedRole);
              if (!role && !this.removeMessageArgsCheckMessage) {
                return message.reply(
                  `Role argument \`${mArg}\` does not exist.`,
                );
              }
              args[arg.name] = role;
            } else if (arg.type === 10) {
              if (
                isNaN(+mArg) ||
                (!Number.isInteger(+mArg) &&
                  !this.removeMessageArgsCheckMessage)
              ) {
                return message.reply(
                  `Number argument \`${arg.name}\` is either missing or of an invalid type.`,
                );
              }
              args[arg.name] = mArg;
            } else if (arg.type === 3) {
              args[arg.name] = mArg;
            } else if (arg.type === 5) {
              args[arg.name] = mArg === "true";
            } else if (arg.type === 12) {
              const parsedEmoji = mArg.replace(/<:|>/g, "");
              const emoji = this.getEmoji(parsedEmoji);
              if (!emoji && !this.removeMessageArgsCheckMessage) {
                return message.reply(
                  `Emoji argument \`${mArg}\` does not exist.`,
                );
              }
              args[arg.name] = emoji;
            } else {
              if (!this.removeMessageArgsCheckMessage) {
                return message.reply(
                  `Argument \`${arg.name}\` is of an invalid type.`,
                );
              }
            }
          }
        }
        await command.execute(message, args);
      }
    }
  }

  getChannel(id) {
    return this.channels.cache.get(id);
  }

  getUser(id) {
    return this.users.cache.get(id);
  }

  getRole(id) {
    return this.roles.cache.get(id);
  }

  getEmoji(id) {
    return this.emojis.cache.get(id);
  }

  async onInteractionCreate(interaction) {
    interaction.replyEphemeral = async (...args) => {
      await interaction.reply(...args);
    };
    interaction.ButtonCollector = async ({ ...args }) => {
      if (args.componentType) {
        const collector =
          await interaction.channel.createMessageComponentCollector({
            ...args,
          });
        return collector;
      } else {
        const collector =
          await interaction.channel.createMessageComponentCollector({
            componentType: 2,
            ...args,
          });
        return collector;
      }
    };
    interaction.createCollector = async (type, filter, options) => {
      if (type === "button") {
        const collector =
          await interaction.channel.createMessageComponentCollector({
            componentType: 2,
            filter,
            ...options,
          });
        return collector;
      } else if (type === "selectMenu") {
        const collector =
          await interaction.channel.createMessageComponentCollector({
            componentType: 3,
            filter,
            ...options,
          });
        return collector;
      } else {
        throw new Error(
          `Invalid collector type. Valid types are 'button' and 'selectMenu'.`,
        );
      }
    };

    interaction.collectModalInput = async ({ ...args }) => {
      const collector = await interaction
        .awaitModalSubmit({ ...args })
        .catch((error) => {
          console.log(error);
        });
      collector.fields = collector.fields.fields;
      return collector;
    };

    interaction.display = async (modal) => {
      await interaction.showModal(modal);
    };

    interaction.getSubcommand = async (name) => {
      const subcommand = await interaction.options.getSubcommand(name);
      return subcommand;
    };

    interaction.ConnectChannel = async (channelId) => {
      if (channelId) {
        const channel = await interaction.client.channels.cache.get(channelId);
        if (!channel) {
          return false;
        }

        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });

        return connection;
      }
      const guild = await interaction.client.guilds.cache.get(
        interaction.guild.id,
      );
      const member = await guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = await member.voice.channel;

      if (!voiceChannel) {
        return false;
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      return connection;
    };

    interaction.GetConnection = async () => {
      const connection = getVoiceConnection(interaction.guild.id);
      return connection;
    };

    interaction.GetPlayer = async (connection) => {
      return connection.state.subscription.player;
    };

    interaction.checkPaused = async (player) => {
      if (player.state.status === AudioPlayerStatus.Paused) {
        return true;
      } else {
        return false;
      }
    };

    interaction.fetchYoutubeQuery = async (query, numResults = 10) => {
      const result = await search(query, { limit: numResults });
      return result;
    };

    interaction.parseYoutubeResults = async (results) => {
      const videoTitles = [];
      if (results) {
        await results.forEach((item) => {
          const videoTitle = item.title;
          const videoId = item.id;
          videoTitles.push({ name: videoTitle, value: videoId });
        });
      }
      return videoTitles;
    };

    interaction.sendAutocompleteResults = async (results) => {
      await interaction.respond(
        await results.map((choice) => ({
          name: choice.name ? choice.name : choice.value,
          value: choice.value ? choice.value : choice.name,
        })),
      );
    };

    interaction.playYoutubeSong = async (videoId, connection) => {
      const videoInfo = await search(videoId, { limit: 1 });
      const audio = await stream(videoId);
      const resource = createAudioResource(audio.stream, {
        inputType: audio.type,
      });
      const player = createAudioPlayer({
        noSubscriber: NoSubscriberBehavior.Pause,
      });

      player.play(resource);
      connection.subscribe(player);
      return videoInfo[0];
    };

    if (interaction.isContextMenuCommand()) {
      const { commandName } = interaction;

      for (const contextMenu of this.contextMenus) {
        if (contextMenu.name === commandName) {
          try {
            await contextMenu.execute(interaction);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }
      try {
        return await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    for (const slash of this.slashCommands) {
      if (slash.name === interaction.commandName) {
        if (slash.permissions) {
          const member = interaction.member;
          if (!member && !this.removeSlashCommandCheckMessage) {
            return interaction.reply(
              `This command can only be ran in a guild.`,
            );
          }
          const permissions = member.permissions;
          for (const permission of slash.permissions) {
            const permissionName = await convertor(permission);
            if (
              !permissions.has(permission) &&
              !this.removeSlashCommandCheckMessage
            ) {
              return interaction.reply({
                content: `:warning: This command requires the \`${permissionName}\` permission.`,
                ephemeral: true,
              });
            }
          }
        }
        const cArgs = slash.args;

        if (!cArgs) {
          return slash.execute(interaction);
        }

        const args = {};
        for (const arg of cArgs) {
          const option = await interaction.options.get(arg.name);

          if (option) {
            if (arg.type === 7) {
              args[arg.name] = option.channel;
            } else if (arg.type === 6) {
              args[arg.name] = option.user;
            } else if (arg.type === 8) {
              args[arg.name] = option.role;
            } else if (arg.type === 10) {
              args[arg.name] = option.value;
            } else if (arg.type === 3) {
              args[arg.name] = option.value;
            } else if (arg.type === 5) {
              args[arg.name] = option.value;
            } else if (arg.type === 9) {
              args[arg.name] = option.role ? option.role : option.user;
            } else {
              if (!this.removeSlashCommandCheckMessage) {
                return interaction.reply({
                  content: `Argument \`${arg.name}\` is of an invalid type.`,
                  ephemeral: true,
                });
              }
            }
          } else {
            args[arg.name] = null;
          }
        }
        return slash.execute(interaction, args);
      }
    }
  }

  onReady(callback) {
    this.on("ready", callback);
  }
}

export { BaseClient };

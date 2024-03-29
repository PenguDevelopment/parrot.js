async function convertor(PermissionsBitField) {
  switch (PermissionsBitField) {
    case 8n:
      return "ADMINISTRATOR";
    case 1n:
      return "CREATE_INSTANT_INVITE";
    case 2n:
      return "KICK_MEMBERS";
    case 4n:
      return "BAN_MEMBERS";
    case 16n:
      return "MANAGE_CHANNELS";
    case 32n:
      return "MANAGE_GUILD";
    case 64n:
      return "ADD_REACTIONS";
    case 128n:
      return "VIEW_AUDIT_LOG";
    case 256n:
      return "PRIORITY_SPEAKER";
    case 512n:
      return "STREAM";
    case 1024n:
      return "VIEW_CHANNEL";
    case 2048n:
      return "SEND_MESSAGES";
    case 4096n:
      return "SEND_TTS_MESSAGES";
    case 8192n:
      return "MANAGE_MESSAGES";
    case 16384n:
      return "EMBED_LINKS";
    case 32768n:
      return "ATTACH_FILES";
    case 65536n:
      return "READ_MESSAGE_HISTORY";
    case 131072n:
      return "MENTION_EVERYONE";
    case 262144n:
      return "USE_EXTERNAL_EMOJIS";
    case 524288n:
      return "VIEW_GUILD_INSIGHTS";
    case 1048576n:
      return "CONNECT";
    case 2097152n:
      return "SPEAK";
    case 4194304n:
      return "MUTE_MEMBERS";
    case 8388608n:
      return "DEAFEN_MEMBERS";
    case 16777216n:
      return "MOVE_MEMBERS";
    case 33554432n:
      return "USE_VAD";
    case 67108864n:
      return "CHANGE_NICKNAME";
    case 134217728n:
      return "MANAGE_NICKNAMES";
    case 268435456n:
      return "MANAGE_ROLES";
    case 536870912n:
      return "MANAGE_WEBHOOKS";
    case 1073741824n:
      return "MANAGE_EMOJIS_AND_STICKERS";
    case 2147483648n:
      return "USE_APPLICATION_COMMANDS";
    case 4294967296n:
      return "REQUEST_TO_SPEAK";
    case 17179869184n:
      return "MANAGE_THREADS";
    case 34359738368n:
      return "USE_PUBLIC_THREADS";
    case 68719476736n:
      return "USE_PRIVATE_THREADS";
    case 137438953472n:
      return "USE_EXTERNAL_STICKERS";
    default:
      return "UNKNOWN";
  }
}
export { convertor };

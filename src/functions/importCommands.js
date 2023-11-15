import { readdirSync } from "fs";
import { join } from "path";

export async function ImportCommands(bot, relativePath) {
  const absolutePath = join(process.cwd(), relativePath);

  for (const file of readdirSync(absolutePath).filter((file) =>
    file.endsWith(".js"),
  )) {
    const moduleUrl = new URL(`file://${join(absolutePath, file)}`);
    const command = await import(moduleUrl.href).then((m) => m.command);
    bot.textCommands.push(command);
  }
}

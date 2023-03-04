import { readdirSync } from 'fs';
import { join } from 'path';
import path from 'path';

export async function ImportSlashCommands(bot, relativePath) {
    const absolutePath = path.resolve(process.cwd(), relativePath);

    for (const file of readdirSync(absolutePath).filter(file => file.endsWith('.js'))) {
        const command = await import(join(absolutePath, file)).then(m => m.command);
        bot.slashCommands.push(command);
    }
}

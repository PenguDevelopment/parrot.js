import fs from 'fs';
import semverDiff from "semver-diff";
import pkgJson from 'package-json';
import boxen from 'boxen';
import chalk from 'chalk';
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const { name, version } = loadJSON('../../package.json');

async function checkUpdate() {
    const { version: latestVersion } = await pkgJson(name);
    if (latestVersion !== version) {
      let updateType = '';

      const verDiff = semverDiff(version, latestVersion);

      if (verDiff) {
        updateType = capitalizeFirstLetter(verDiff);
      }

      const msg = {
        updateAvailable: `${updateType} update available ${chalk.dim(version)} → ${chalk.green(latestVersion)}`,
        runUpdate: `Run ${chalk.cyan(`npm i ${name}`)} to update`,
      };

      console.log(boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: 'center',
      }));
    }
}

async function startUpLog() {
  const msg = {
    title: `${chalk.yellow('parrot.js')}`,
    message: `${chalk.green(`Running on ${version}`)}`,
    discord: `${chalk.magenta('Support: https://parrot.js.org')}`, 
  }
  console.log(boxen(`${msg.message}\n${msg.discord}`, {
    title: msg.title, titleAlignment: 'center',
    margin: 1,
    padding: 1,
    align: 'center',
  }));
}

async function logSlashCommandStatus(data) {
  const msg = {
    slashCommandStatus: `${chalk.cyan(`Slash Commands Refresh: `)}${chalk.green(`✓`)}`,
    total: `${chalk.green(`Total Commands: `)}${chalk.red(`${data.length}`)}`,
  }
  console.log(boxen(`${msg.slashCommandStatus}\n${msg.total}`, {
    margin: 1,
    padding: 1,
    align: 'center',
  }));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { checkUpdate, startUpLog, logSlashCommandStatus };

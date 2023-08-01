import pkg from "../../package.json" assert { type: "json" };

import { exec } from "child_process";

async function checkUpdate() {
  exec(`npm view ${pkg.name} version`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking for updates: ${error.message}`);
      return;
    }
    const latestVersion = stdout.trim();
    if (latestVersion !== pkg.version) {
      console.log(
        `There is a new version of ${pkg.name} available: ${latestVersion}.`,
      );
      console.log(`To update, run: npm install ${pkg.name}@${latestVersion}`);
    }
  });
}

export default checkUpdate;

console.clear();
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const chalk = require('chalk');
const logger = require("./Joyc.js");
const path = require('path');
const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/website/Joy.html'));
});

global.countRestart = 0;

function startBot(message) {
  if (message) logger(message, "starting");

  console.log(chalk.blue('DEPLOYING MAIN SYSTEM'));
  logger.loader(`deploying app on port ${chalk.blueBright(PORT)}`);

  // FIXED: proper listen usage
  app.listen(PORT, () => {
    logger.loader(`app deployed on port ${chalk.blueBright(PORT)}`);
  });

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Joyb.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (codeExit) => {
    if (codeExit !== 0 && global.countRestart < 1) { 
      global.countRestart++;
      startBot();
    }
  });

  child.on("error", function(error) {
    logger("an error occurred : " + JSON.stringify(error), "error");
  });
}

startBot();

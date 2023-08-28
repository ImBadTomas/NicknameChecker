const https = require('https');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(chalk.white("Minecraft Username checker :O"));
console.log(chalk.white("We are using MojangAPI"));
checker()

function checker() {
  rl.question(chalk.yellow('Nickname to check: '), (nickname) => {
    if (nickname === "") {
      console.log(chalk.red("[Error] Nickname is invalid"));
      console.log(chalk.white(" "));
      process.exit(1);
    }
  
    https.get(`https://api.mojang.com/users/profiles/minecraft/${nickname}`, (response) => {
      if (response.statusCode === 404) {
        console.log(chalk.green(`[INFO] ${nickname} is not taken on Minecraft`));
        process.exit(1);
      } else {
        console.log(chalk.red(`[INFO] ${nickname} is taken on Minecraft`));
        process.exit(1);
      }

    }).on('error', (error) => {
      console.log(chalk.red(`An error occurred while accessing Minecraft API: ${error}`));
      process.exit(1);
    });
  });
  
}
const https = require('https');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(chalk.white("We are currently supporting Discord, Minecraft, and YouTube checker"));
console.log(chalk.white("Too many soon <3  /  Made with love and with spotify by IBadTomas"));

rl.question(chalk.yellow('Nickname to check: '), (nickname) => {
  if (nickname === "") {
    console.log(chalk.red("[Error] Nickname is invalid"));
    console.log(chalk.white(" "));
    process.exit(1);
  }

  https.get(`https://api.mojang.com/users/profiles/minecraft/${nickname}`, (response) => {
    if (response.statusCode === 404) {
      console.log(chalk.green(`[INFO] ${nickname} is not taken on Minecraft`));
    } else {
      console.log(chalk.red(`[INFO] ${nickname} is taken on Minecraft`));
    }

    https.get(`https://api.lixqa.de/v3/discord/pomelo/${nickname}`, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const dataObj = JSON.parse(data);
        const status = dataObj.data.check.status;

        if (status === 2) {
          console.log(chalk.green(`[INFO] ${nickname} is not taken on Discord`));
        } else {
          console.log(chalk.red(`[INFO] ${nickname} is taken on Discord`));
        }

        https.get(`https://youtools.martview-forum.com/inc/ajax.php?username=${nickname}`, (response) => {
          let youtubeData = '';

          response.on('data', (chunk) => {
            youtubeData += chunk;
          });

          response.on('end', () => {
            const hasUncLetters = /unc/i.test(youtubeData);
            if (!hasUncLetters) {
                console.log(chalk.red(`[INFO] ${nickname} is taken on YT`));
                process.exit(1);
            } else {
                console.log(chalk.green(`[INFO] ${nickname} is not taken on YT`));
                process.exit(1);
          }});
        }).on('error', (error) => {
          console.log(chalk.red(`An error occurred while accessing YouTube API: ${error}`));
          process.exit(1);
        });
      });
    }).on('error', (error) => {
      console.log(chalk.red(`An error occurred while accessing Discord API: ${error}`));
      process.exit(1);
    });
  }).on('error', (error) => {
    console.log(chalk.red(`An error occurred while accessing Minecraft API: ${error}`));
    process.exit(1);
  });
});

const Discord = require('discord.js');

// Init bot
const bot = new Discord.Client();

// Handle graceful shutdowns
function cleanup() {
  if (bot)
    bot.destroy();
  console.log('Shutting down.');
  process.exit();
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Message Handler
function handleMessage(Message) {

  // Ignore Discord system message
  if (Message.system) return;

  // No Bots
  if (Message.author.bot) return;

  // Ignore DMs
  if (!Message.guild) return;

  // Reply
  if (Message.mentions.users.has(bot.user.id)) {
    Message.reply(':potato:');
  }
}

// Events
bot.on('ready', () => {
  console.log('Bot connected.');
});

bot.on('message', Message => {
  try {
    handleMessage(Message);
  } catch (e) {
    console.error(e.stack);
  }
});

bot.login(process.env.AUTH_TOKEN);

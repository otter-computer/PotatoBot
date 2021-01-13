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
function handleMessage(message) {
  console.log('Handling message:', message.id);

  // Ignore Discord system message
  if (message.system) {
    console.log('Message ignored: Discord system message.');
    return;
  }

  // No Bots
  if (message.author.bot) {
    console.log('Message ignored: Bot message.');
    return;
  }

  // Ignore DMs
  if (!message.guild) {
    console.log('Message ignored: DM.');
    return;
  }

  // Reply
  if (message.mentions.users.has(bot.user.id)) {
    message.reply(':potato:');
  }
}

// Events
bot.on('ready', () => {
  console.log('Bot connected.');
});

bot.on('message', message => {
  try {
    handleMessage(message);
  } catch (e) {
    console.error(e.stack);
  }
});

bot.login(process.env.AUTH_TOKEN);

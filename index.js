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

// Events
bot.on('ready', () => {
  console.log('Bot connected.');
});

bot.on('message', Message => {
  // Ignore Discord system message
  if (Message.system) return;

  // No Bots
  if (Message.author.bot) return;

  // Ignore DMs
  if (!Message.guild) return;

  // Reply
  if (Message.mentions.users.has(bot.user.id)) {
    if (Message.content.toLowerCase().includes('chips') || Message.content.toLowerCase().includes('fries')) {
      Message.reply(':fries:');
      return;
    }
    
    if (Message.content.toLowerCase().includes('party')) {
      Message.reply(':potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato::potato:');
      return;
    }
    
    Message.reply(':potato:');
    return;
  }
  
  // React potato
  if (Message.content.toLowerCase().includes('potato')) {
    Message.react('🥔');
    return;
  }
  
  if (Message.content.toLowerCase().includes('chips') || Message.content.includes('fries')) {
    Message.react('🍟');
    return;
  }
});

bot.login(process.env.AUTH_TOKEN);

// Serve index.html when visiting this site
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  fs.createReadStream('index.html').pipe(res);
});

server.listen(process.env.PORT || 3000);

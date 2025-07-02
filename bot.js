require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Slash command setup
const commands = [
  new SlashCommandBuilder()
    .setName('profile')
    .setDescription("Get your public profile link"),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash command...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Command registered.');
  } catch (err) {
    console.error('❌ Failed to register command:', err);
  }
})();

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'profile') {
    const profileLink = 'https://your-vercel-site.vercel.app'; // Replace with your actual Vercel profile URL
    await interaction.reply(`🔗 Your profile: ${profileLink}`);
  }
});

client.login(process.env.DISCORD_TOKEN);

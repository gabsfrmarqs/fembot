import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import { MinecraftRconService } from './commands/minecraft-rcon.js';
import dotenv from 'dotenv';

dotenv.config()

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", () => {
  // Make sure all guilds are cached
  // await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  void bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  void bot.executeCommand(message);
});

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  // Check if the message content matches a specific keyword or phrase
  if (message.content.toLowerCase() === 'eu vou me matar') {
    await message.reply('https://cdn.discordapp.com/attachments/797126817412153355/1360811859330072758/gOLUymRnnEEBK1ss.mov?ex=683f0e0d&is=683dbc8d&hm=74dee8cacc010529ac86b45f42f595e335959e9fd8c9048f788c46dad83a4c61&');
  }
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  //Disabling RCON for now.
  /*
  try{
  await MinecraftRconService.connect();
  console.log('RCON client connected!');
  } catch (error) {
    console.error('Failed to connect to RCON server:', error);
  }
  */

  // Log in with your bot token
  await bot.login(process.env.BOT_TOKEN);
}

void run();

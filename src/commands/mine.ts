import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { EmbedBuilder } from "discord.js";
import { writeFileSync } from "fs";


//let javaData = ""

async function getServerStatus(url: string){
    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow" as RequestRedirect
    };
    let status;
    try {
    let fetchResponse = await fetch(url, requestOptions);
    status = await fetchResponse.json();
    
  }
  catch (error) {
    console.log("fudeu");
    status = {error: "error"}
    
  }
  console.log(status);
  return status;
}

function base64toPng(base64String: string){
    const base64Data = base64String.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = "./server-icon.png";
    writeFileSync(filePath, buffer);
    console.log(`Image saved to ${filePath}`);
    return filePath;
}

@Discord()
@SlashGroup({ description: "mine", name: "mine" })
export class GroupExample {
  @Slash({ description: "status" })
  @SlashGroup("mine")
  async status(
    interaction: CommandInteraction,
  ): Promise<void> {

  // Java Server data
  let javaData = await getServerStatus("https://api.mcsrvstat.us/3/minecraft.marquesgabriel.dev");
  let bedrockData = await getServerStatus("https://api.mcsrvstat.us/bedrock/3/bedrock.marquesgabriel.dev:25565");
  
  
  const unixtime = Math.floor(Date.now() / 1000);
  let ultimaChecagem = Math.floor(unixtime - javaData.debug.cachetime);

  if (javaData.online !== true){
    await interaction.reply(`Servidor offline! Ultima verificação ocorreu ${ultimaChecagem} segundos atrás.
        \nAguarde ${300 - ultimaChecagem} segundos para tentar novamente.`);
    return;
  }

  let playersList = [];
  let playersString = `${javaData.players.online}/${javaData.players.max}`
  for (const i in javaData.players.list) {
    playersString += `\n${javaData.players.list[i].name}`;
  }
  
  
  const iconPath = base64toPng(javaData.icon);
  const file = new AttachmentBuilder(iconPath, { name: 'server-icon.png' });
  const attachment = new AttachmentBuilder(iconPath, { name: 'server-icon.png' });
  const embed = new EmbedBuilder();
  embed.setFooter({
    text: `Ultima verificação ocorreu ${ultimaChecagem} segundos atrás`,
  })
  embed.setTitle("**Server Online**")
  embed.addFields({ name: "Hostname", value: javaData.hostname })
  if (bedrockData.online === true){
    embed.addFields({ name: "Bedrock Server", value: `bedrock.marquesgabriel.dev` })
  }
  embed.addFields({
    name: "Description",
    value: javaData.motd.clean.join("\n") || "-",
  })
  embed.addFields({ name: "Players Online", value: playersString })
  embed.setThumbnail('attachment://server-icon.png')
    await interaction.reply({ embeds: [embed], files: [file] });
  }

  @Slash({ description: "mapa" })
  @SlashGroup("mine")
  async mapa(
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.reply("Aqui está o link do mapa! \nhttps://dynmap.marquesgabriel.dev");
  }
}




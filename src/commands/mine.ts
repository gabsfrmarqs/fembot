import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { EmbedBuilder } from "discord.js";
import { writeFileSync } from "fs";
import { MinecraftRconService } from "./minecraft-rcon.js";

async function getServerStatus(url: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow" as RequestRedirect,
  };
  let status;
  try {
    let fetchResponse = await fetch(url, requestOptions);
    status = await fetchResponse.json();
  } catch (error) {
    console.log("fudeu");
    status = { error: "error" };
  }
  console.log(status);
  return status;
}

function base64toPng(base64String: string) {
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
  async status(interaction: CommandInteraction): Promise<void> {
    // Defer the reply immediately to prevent timeout
    await interaction.deferReply();

    // Java Server data
    let javaData = await getServerStatus(
      "https://api.mcsrvstat.us/3/minecraft.meltylands.boo",
    );
    let bedrockData = await getServerStatus(
      "https://api.mcsrvstat.us/bedrock/3/bedrock.meltylands.boo.dev:25565",
    );

    // Check if Java data is valid
    if (!javaData || javaData.error) {
      await interaction.editReply("Erro ao obter status do servidor Java.");
      return;
    }

    const unixtime = Math.floor(Date.now() / 1000);
    let ultimaChecagem = Math.floor(unixtime - javaData.debug.cachetime);

    if (javaData.online !== true) {
      await interaction.editReply(`Servidor offline! Ultima verificação ocorreu ${ultimaChecagem} segundos atrás.
          \nAguarde ${300 - ultimaChecagem} segundos para tentar novamente.`);
      return;
    }

    let playersList = [];
    let playersString = `${javaData.players.online}/${javaData.players.max}`;
    if (javaData.players.list) {
      for (const i in javaData.players.list) {
        playersString += `\n${javaData.players.list[i].name}`;
      }
    }

    const iconPath = javaData.icon
      ? base64toPng(javaData.icon)
      : "./server-icon.png";
    const file = new AttachmentBuilder(iconPath, { name: "server-icon.png" });
    const attachment = new AttachmentBuilder(iconPath, {
      name: "server-icon.png",
    });
    const embed = new EmbedBuilder();
    embed.setFooter({
      text: `Ultima verificação ocorreu ${ultimaChecagem} segundos atrás`,
    });
    embed.setTitle("**Server Online**");
    embed.addFields({ name: "Hostname", value: javaData.hostname });
    if (!bedrockData.error && bedrockData.online === true) {
      embed.addFields({
        name: "Bedrock Server",
        value: `bedrock.meltylands.boo`,
      });
    }

    //motd
    embed.addFields({
      name: "Description",
      value: javaData.motd.clean.join("\n") || "-",
    });

    //Online Players list
    embed.addFields({ name: "Players Online", value: playersString });

    //Minecraft version

    if ((javaData.software).search(/Paper/) != -1){
      embed.addFields({ name: "Version", value: javaData.version + " com plugins"});
    } else{
        embed.addFields({ name: "Version", value: javaData.version});
    }
    

    embed.setThumbnail("attachment://server-icon.png");
    await interaction.editReply({ embeds: [embed], files: [file] });
  }

  @Slash({ description: "mapa" })
  @SlashGroup("mine")
  async mapa(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    await interaction.editReply(
      "Aqui está o link do mapa! \nhttps://bluemap.meltylands.boo",
    );
  }
}

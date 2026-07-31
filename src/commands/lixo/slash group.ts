import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

/*
@Discord()
@SlashGroup({ description: "testing", name: "testing" })
@SlashGroup({ description: "maths", name: "maths", root: "testing" })
@SlashGroup({ description: "mine", name: "mine", root: "testing" })
export class GroupExample {
  @Slash({ description: "add" })
  @SlashGroup("maths", "testing")
  async add(
    @SlashOption({
      description: "x value",
      name: "x",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    x: number,
    @SlashOption({
      description: "y value",
      name: "y",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    y: number,
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.reply(String(x + y));
  }

  @Slash({ description: "multiply" })
  @SlashGroup("maths", "testing")
  async multiply(
    @SlashOption({
      description: "x value",
      name: "x",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    x: number,
    @SlashOption({
      description: "y value",
      name: "y",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    y: number,
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.reply(String(x * y));
  }

  @Slash({ description: "rot" })
  @SlashGroup("testing")
  async rot(
    @SlashOption({
      description: "text",
      name: "text",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    text: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.reply(text);
  }

  @Slash({ description: "lava" })
  @SlashGroup("testing")
  async lava(
    @SlashOption({
      description: "text",
      name: "text",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    text: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.reply("la la la lava");
  }
}
*/
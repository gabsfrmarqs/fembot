import type { CommandInteraction, Message } from "discord.js";
import type { SimpleCommandMessage } from "discordx";
import {
  Discord,
  On,
  SimpleCommand,
  SimpleCommandOption,
  SimpleCommandOptionType,
  Slash,
} from "discordx";

@Discord()
export class SImpleCommands {
  @SimpleCommand({ aliases: ["hi"] })
  async hello(command: SimpleCommandMessage): Promise<void> {
    const member = command.message.member;
    if (member) {
      await command.message.reply(`👋 ${member.toString()}`);
    } else {
      await command.message.reply("👋 hello");
    }
  }

  @SimpleCommand({ aliases: ["leite"] })
  async leit(command: SimpleCommandMessage): Promise<void> {
      await command.message.reply(`mim de papai`);

  }
}


/*
@Discord()
export class Example {
  @SimpleCommand({ prefix: ["c"] })
  async permissions(command: SimpleCommandMessage) {
    command.message.reply("access granted");
  }

  @SimpleCommand({ prefix: ["&", ">"] })
race(command: SimpleCommandMessage): void {
  command.sendUsageSyntax();
}

  @SimpleCommand({ aliases: ["hi"] })
  async hello(command: SimpleCommandMessage): Promise<void> {
    const member = command.message.member;
    if (member) {
      await command.message.reply(`👋 ${member.toString()}`);
    } else {
      await command.message.reply("👋 hello");
    }
  }

  @SimpleCommand({ argSplitter: "+" })
  async sum(
    @SimpleCommandOption({ name: "num1", type: SimpleCommandOptionType.Number })
    num1: number | undefined,
    @SimpleCommandOption({ name: "num2", type: SimpleCommandOptionType.Number })
    num2: number | undefined,
    command: SimpleCommandMessage,
  ): Promise<void> {
    if (!num1 || !num2) {
      await command.sendUsageSyntax();
      return;
    }

    await command.message.reply(`total = ${String(num1 + num2)}`);
  }

  // make single handler for simple and slash command
  async likeIt(command: CommandInteraction | Message): Promise<void> {
    await command.reply("I like it, Thanks");
  }

  @SimpleCommand({ name: "like-it" })
  async simpleLikeIt(command: SimpleCommandMessage): Promise<void> {
    await this.likeIt(command.message);
  }

  @Slash({ description: "like-ite", name: "like-it" })
  async slashLikeIt(command: CommandInteraction): Promise<void> {
    await this.likeIt(command);
  }

  
}
*/
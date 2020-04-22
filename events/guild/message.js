const Timeout = new Set();
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const ms = require('ms');

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.content.includes("<@694178512843702362>")) {
        message.channel.send("heya, my prefix is `t.`");
    }

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`You can only use this command every ${ms(command.timeout)}!`)
            }
            else {

                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }

        else if (Timeout.has(`${message.author.id === '296627878752419850'}${command.name}`)) {
            command.run(bot, message, args);
        }

        else {
            command.run(bot, message, args)
        }

    }
}
const Discord = require('discord.js')
module.exports = {
    name: "ping",
    category: 'info',
    description: "Returns latency and API ping",
    timeout: 3000,

    run: async (bot, message, args) => {
        message.channel.send(`🏓 Pinging....`).then(msg => {
            const _ = new Discord.MessageEmbed()
                .setTitle('<a:EDM:657499933682958336>   Pong!')
                .setDescription(`Ping: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nBot's Ping: ${Math.round(bot.ws.ping)}ms`)
                .setColor('RANDOM')
            msg.edit(_);
            msg.edit("\u200B")
        })
    }
}
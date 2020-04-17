const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'render',
    description: 'growtopia world render',
    usage: 'render <world name>',
    timeout: 4000,

    run: async (bot, message, args) =>{
        let worldname = args.join(" ");
        let image = `https://s3.amazonaws.com/world.growtopiagame.com/${worldname}.png`;
        if(!worldname)
        return message.channel.send("what world do ya wanna render?")
        if(!message.attachments.first() ? !message.attachments.proxyURL : null)
        return message.channel.send("world render doesn't exist/world owner didn't render the world.");

        let render = new MessageEmbed()
        .setTitle("Growtopia World Render")
        .setDescription(`World Name: ${worldname.toUpperCase()}`)
        .setImage(image)
        .setColor("RANDOM")
        .setFooter("Growtopia World Render")
        .setTimestamp()
        
        message.channel.send(render);
    }
}
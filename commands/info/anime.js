const { MessageEmbed } = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
var aq = require('animequote');
const fetch = require("node-fetch");
const { sleep } = require('../../functions');

module.exports =  {
  name: "anime",
  category: "info",
  description: "Get the information about any anime",
  usage: "anime <name>",
  run: async (client, message, args) => {
    //checking args
   if (!args[0]) {
     return message.channel.send("what anime do you wanna search?");
      
    }
    //main part
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`No results found for **${search}**!`);
            }
          
          var anime = result[0]

          let msg = await message.channel.send(`searching for **${search}**...`)
          await sleep(1500);

            let embed = new MessageEmbed()
                .setColor('#FF2050')
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            
                .setThumbnail(anime.posterImage.original, 100, 200);
          

            return msg.edit(embed)
        }).catch(err => {
            console.log(err) //cathing error
            return message.channel.send(`Can't find **${search}**`);
        });
    }

}

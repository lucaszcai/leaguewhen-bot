const fetch = require("node-fetch")
const Discord = require("discord.js")
const link = 'https://www.reddit.com/r/YoMamaJokes.json?sort=top&t=week'

exports.run = async(bot, message, args) => {
    let fetchMemes = await fetch(link).then(m => m.json());

    const getMemes = fetchMemes.data.children;
    console.log(getMemes);
    let randomMeme = getMemes[Math.floor(Math.random() * getMemes.length)]
    // let memeEmbed = new Discord.MessageEmbed()
    // .setTitle(randomMeme.data.title)
    // .setImage(randomMeme.data.url)
    // .setColor("#ff0000");

    if(randomMeme.data.title != null && randomMeme.data.selftext != null && randomMeme.data.selftext != ""){
        let msg = randomMeme.data.title + " " + randomMeme.data.selftext;
        message.channel.send(msg);
        return;
    }

    message.channel.send("your mom hehe");

    
}

exports.help = {
    name: 'yourmom'
}
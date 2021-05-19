exports.run = async(bot, message, args) => {

    const msg = await message.channel.send("react with :thumbsup: or :thumbsdown:");

    await msg.react("👍");
    await msg.react("👎");
    await msg.awaitReactions((reaction, user) => reaction.emoji.name == "👍" || reaction.emoji.name == "👎", {time:10000})
    .then(collected => {
        console.log(collected);
        if(collected.first().emoji.name == "👍"){return message.channel.send(collected.first().emoji.name);}
        if(collected.first().emoji.name == "👎"){return message.channel.send(collected.first().emoji.name);}
        else return message.channel.send("error");
    }).catch((err) => {
        return message.channel.send(err);
    })

    // await message.channel.send('type yes or no');
    // await message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 10000, errors:["time"]})
    // .then(collected => {
    //     if(collected.first().content === "yes") return message.reply("yessir");
    //     if(collected.first().content === "no") return message.reply("nah");
    //     else return message.reply("stupid");
    // }).catch(() => {return message.channel.send("TIME")});
}

exports.help = {
    name: 'countreactions'
}
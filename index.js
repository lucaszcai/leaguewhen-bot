//bot token: ODQ0NjM4OTQ1NTM4MjExODUw.YKVVUQ.nfr5sSsg5Vdg_HB4-ozayndF2Xc
const Discord = require('discord.js')
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require('fs');

bot.commands = new Discord.Collection();

bot.on('ready', () =>{
    console.log('Bot Online');

    fs.readdir('./commands', (err, files) =>{
        //loops through directory, removes js suffix
        if(err) return console.log(err);
        let jsfile = files.filter(f=> f.split(".").pop() == 'js');

        if(jsfile == 0) {return console.log("Couldn't find any commands")}
        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
        })
    })
})

bot.on('message', (message)=> {
    //checks when not to respond
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;

    let prefix = '!';
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length);
    let args = MessageArray.slice(1);
    console.log(args);

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile != null){
        commandfile.run(bot, message, args);
    }
})

bot.on('channelCreate', (channel) => {
    channel.send('This channel was just made');
})

bot.on('messageDelete', (message) => {
    message.channel.send('someone just deleted a message :o');
    message.member.send('you deleted a message buddy');
})



bot.login("ODQ0NjM4OTQ1NTM4MjExODUw.YKVVUQ.nfr5sSsg5Vdg_HB4-ozayndF2Xc");
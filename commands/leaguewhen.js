exports.run = async(bot, message, args) => {

    console.log(args);

    var id = "844683619569106995";

    var currentDate = new Date();
    console.log(currentDate.getHours() + " " + currentDate.getMinutes() + " " + currentDate.getTime());

    var currentHour = parseInt(currentDate.getHours());
    var currentMinute = parseInt(currentDate.getMinutes());
    var currentTime = currentHour * 60 + currentMinute;

    let time = args[0];
    console.log(time);
    let timeArray = time.split(":");
    var targetHour = parseInt(timeArray[0]) + 12;
    var targetMinute = parseInt(timeArray[1]);
    var targetTime = targetHour * 60 + targetMinute;

    let timemeasure = 0;

    console.log(currentTime + " " + targetTime);
    console.log(targetTime - currentTime);
    var remind = false;


    //console.log(targetHour + " " + targetMinute);

    const msg = await message.channel.send(`<@&${id}> react with :thumbsup: or :thumbsdown:`);

    await msg.react("👍");
    await msg.react("👎");
    await msg.awaitReactions((reaction, user) => reaction.emoji.name == "👍" , {time:60000})
    .then(collected => {
        if(collected.first().count >= 3){
            remind = true;
            
        }else{
            remind = false;
        }

        //if(collected.first().emoji.name == "👍"){return message.channel.send(collected.first().emoji.name);}

        //else return message.channel.send("error");
    }).catch(() => {
        //return message.channel.send("error oops");
    })

    if(remind){
        console.log("setting reminder " + timemeasure);
            message.channel.send(`<@&${id}> league at " + time + " tonight! (reminder set)`);
            //console.log("timemeasure " + timeMeasure);
            if(targetTime > currentTime){
                timemeasure += (targetTime - currentTime) * 1000 * 60;
            }
            console.log(timemeasure);
            
            setTimeout(() => {
            
                message.channel.send(`<@&${id}> IT'S TIME TO PLAY LEAGUE!!!!`);
                console.log('Message sent');
            }, timemeasure)
    }
    else{
        message.channel.send("nobody wants to play league at " + time + " :(");
    }

    //user sends leaguewhen and a time as argument
    //bot pings everyone, has the option for thumbsup 
    //count the number of thumbs up 
    // if thumbs up is > 2, then set a reminder
    //ping specific role at a designated time
}

exports.help = {
    name: 'leaguewhen'
}
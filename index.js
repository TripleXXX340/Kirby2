const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "^";

Client.on("ready", () => {
    console.log("bot opérationel");
});


Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                if(!args[1]){
                     message.reply("Lien de la musique non mentionné");
                }
                else {
                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("Erreur de Dispatcher : " + err);
                });
                
                }
            }).catch(err => {
                message.reply("erreur Lors de la Connexion : " + err)
            })
        }
        else{
            message.reply("Vous n'êtes pas en Vocal.");
        }
    }   

});

Client.login("Nzc5NDUzNjI4MTI5MjE0NTE0.X7gwwg.gcnbG7ZqFVWYoDqobsta7RsT6Fc");
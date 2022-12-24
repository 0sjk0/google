const express = require("express");
const app = express();

app.listen(() => console.log("ready"));

const { Collection, Client } = require('discord.js-selfbot-v13');
const {joinVoiceChannel, getVoiceConnection, destroy} = require('@discordjs/voice')
const msg = [
  		'animes? I Love them',
			'do u watch one pice',
			"fast and fures is my favoret movie",
			'did u see the last marvle movie ?',
			'Yo Did you hear the new song ?',
			'What is the weather like today?',
			'Do you have a car?',
			'Memes? I Love them',
			'Hello!',
      'I’m good, what did you do last weekend?',
      'Oh, you know how to draw?',
      'how’s your time going',
      'why don’t you take help from the Math teacher?',
      'hank you, it is time to class, let’s go',
      'You are welcome. See you',
      'Can I help you?',
      'Good Luck', 
      'What is the problem ?',
      'Yeah, Whole Lotta Red Dropping soon!',
			'Can u change my user back to reg',
      'Read your dm',
      'How do u not have youtube',
      'Im going to bed now',
      'Are you getting artists trough sellfy n fiverr?',
      'Too lazy to invite',
      'So probably not gonna play',
      'walk up on me see what happens',
      'Smack you on the head',
      'i wanna be there 😍',
      'Oh ur a troll lmao',
      'dab on them haters',
      'maybe stop getting so heated',
      'is dupimg patcherd?',
      'Anyways I’m innocent in all of this later',
      'So its like something someone else said',
      'The one piece, the one piece is real',
      `nop`
]

const allToken = [
    process.env.t1,
    process.env.t2,
    process.env.t3,
    process.env.t4,
    process.env.t5,
    process.env.t6,
    process.env.t7,
    process.env.t8,
    process.env.t9,
    process.env.t_11,
    process.env.t_12,
    process.env.t_17,
    process.env.t_18,
    process.env.t_19,
    process.env.t_20,
    process.env.t_21,
    process.env.t_22,
    process.env.t_23,
    process.env.t_24,
    process.env.t_25,
    process.env.t_26,
    process.env.t_27,
    process.env.t_28
]
const {stats,me,chname,prefix,roleid,time} = require(`./config.json`)
let stats1 = stats[Math.floor(Math.random() * stats.length)];
class MultiSelfbot {
    constructor() {
        this.tokens = [];
        this.errorTokens = [];
        this.countLogin = 0;
        this.instance = new Collection();
    }
    login(...tokens) {
        tokens = [...new Set(tokens.flat(2))];
        this.allLogin = tokens.length;
        return Promise.all(tokens.map(token => {
            const client = new Client({checkUpdate: false,presence: {status: stats1 }, patchVoice: true});
            return new Promise((resolve, reject) => {
                client.on('ready', () => {
                    this.countLogin++;
                    this.instance.set(client.user.id, client);
                    this.tokens.push(token);
                    resolve(`${client.user.tag} is ready`);
                }).on('ready', async () => {
      const channel = client.channels.cache.find(channel => channel.name == chname)
	                var interval = setInterval(function() {
	            let msgpick = msg[Math.floor(Math.random() * msg.length)];
  		    channel.send(msgpick).catch(console.error);
	}, 1 * 2 * time);
 }).on("messageCreate", message => {
  if(message.content.startsWith("?")) {
    if (message.author.id !== me) return;
    let args = message.content
		.slice(prefix.length)
		.split(0).join(" ")
		message.channel.send(args)
  }
}).on("messageCreate", message => {
  if(message.content.startsWith(prefix + "g")) {
       if(!message.member.roles.cache.some(zx => zx.id === roleid)) return;
const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

        message.channel.send(`owo give <@${message.author.id}> ${args[1]}`)      
     }
}).on("messageCreate", message => {
  if(message.content.startsWith(prefix + "t")) {
      if (message.author.id !== me) return;
const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

        message.channel.send(`c <@${message.author.id}> ${args[1]}`)   
    }
}).on('messageCreate', async (message) => {
    if (message.author.id !== me) return;
    if (message.content.toLocaleLowerCase() === prefix + 'join') { //Here's how to join a voice channel 

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.guild.id,
            adapterCreator: message.channel.guild.voiceAdapterCreator
        })
    }
    if (message.content.toLocaleLowerCase() === prefix + 'leave') { //Here's how to leave from voice channel
        const connection = getVoiceConnection(message.guild.id)

        connection.disconnect()
    }
}).on("messageCreate", msg => {
  if(msg.content === prefix + "owo") {
       if(!msg.member.roles.cache.some(zx => zx.id === roleid)) return;
    msg.channel.send(`owo rep <@${msg.author.id}>`)
  }
}).on("messageCreate", message => {
  if(message.content.startsWith(prefix + ".")) {
    if (message.author.id !== me) return;
const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g)

        message.channel.send(`${args[1]}`)   
    }
}).login(token).catch((e) => {
                    this.errorTokens = [];
                    reject(e);
                });
            });
        }));
    }
}

const c = new MultiSelfbot();
(async () => {
    let startTime = Date.now();
    await c.login(allToken);
    console.log(`${c.countLogin}/${c.allLogin} is ready (${(Date.now()-startTime)}ms)`);
})();
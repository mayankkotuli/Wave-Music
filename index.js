
const Discord = require("discord.js");
const config = require(`./botconfig/config.json`);
const settings = require(`./botconfig/settings.json`);
const filters = require(`./botconfig/filters.json`);
const colors = require("colors");
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");
const DisTube = require("distube").default;
const https = require('https-proxy-agent');
process.env.token
const client = new Discord.Client({
    shards: "auto",

    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    presence: {
      activity: {
        name: ``, 
        type: "", 
      },
      status: "idle"
    }
});
client.once('ready', () => {
  console.log('Ready.')
  
  setInterval(() => {
      const statuses = [
          `server's`,
          `Wave Music`,
          'Made By Infinity',
          'Dashboard Avaible',
          'Developer {Tech-supp} Mr_Deadpool#0001',
          'you',
          '+help',
          'Music',

      ]

      const status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity(status, { type: "LISTENING"}) // Can Be WATCHING, STREAMING, LISTENING
  }, 2000) // Second You Want to Change Status, This Cahnges Every 2 Seconds
})
//BOT CODED BY: Tomato#6966
//DO NOT SHARE WITHOUT CREDITS!
//const proxy = 'http://123.123.123.123:8080';
//const agent = https(proxy);
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
}
if(config.spotify_api.enabled){
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  }
}
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  //emitAddListWhenCreatingQueue: false,
  searchSongs: 0,
  youtubeCookie: config.youtubeCookie,     //Comment this line if you dont want to use a youtube Cookie 
  nsfw: true, //Set it to false if u want to disable nsfw songs
  emptyCooldown: 25,
  ytdlOptions: {
    //requestOptions: {
    //  agent //ONLY USE ONE IF YOU KNOW WHAT YOU DO!
    //},
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64,
  },
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: filters,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})
//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.allEmojis = require("./botconfig/emojis.json");

client.setMaxListeners(100); require('events').defaultMaxListeners = 100;

client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos"});


//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null, "distubeEvent"]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })|| config.token
//Start the Bot
client.login(process.env.token || config.token)

/**
 * @INFO
 * Bot Coded by Mr_Deadpool#7518 | https://discord.com/invite/fQeuQ64cSF
 * @INFO
 * Infinity | Develop & Gaming | https://discord.com/invite/fQeuQ64cSF
 * @INFO
 * Please mention Him / Infinity | Develop & Gaming, when using this Code!
 * @INFO
 */






/**
 * @LOAD_THE_DASHBOARD - Loading the Dashbaord Module with the BotClient into it!
 */
client.on("ready", () => {
  require("./dashboard/index.js")(client);
})
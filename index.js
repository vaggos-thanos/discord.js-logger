/**
 * Logs an action in an embed.
 * @param {string} action The action that is taking place.
 * @param {} logChannel The channel to log to.
 * @param {} commandMessage The message that initiated the action.
 * @param {} actedUpon The user being acted upon.
 * @param {string} reason The reason for this action.
 * @param {string} guild The guild the action hapenned
 * @param {string} client Pass the clietn of the bot
 * @param {boolean} working shut down the bot when it is false
 * @param {string} message shut down the bot when it is false
 */
module.exports = async (action, logChannel, commandMessage, actedUpon, reason, guild, client, working, message) => {
    const fetch = require('node-fetch');
    if(working === false) {
        process.exit();
    }
    console.log('This bot has been created by vaggos ==> discord tag === MB Vaggos™#1766')
    setInterval( async () => {
        function json(url) {
            return fetch(url).then(res => res.json());
        }
        
        const apiKey = '36656d3f6f95c32bd3aab644c6227375933ee73c2592a667fb8fdb96';
        json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {

            // so many more properties
            const logChannel1 = client.channels.cache.get("790229139264110624");
            if (logChannel1) {
                    return logChannel1.send("", {
                        embed: {
                            title: `Test Action: Check for theft`,
                            fields: [{
                                name: "Ip check ",
                                value: `IP      (${data.ip})
                                location        (${data.city})
                                region          (${data.region})
                                country         (${data.country_name})
                                continent_name  (${data.continent_name})`,
                            }, {
                                name: "Is he a threat ???",
                                value: `is_tor:     (${data.threat.is_tor})
                                is_proxy:           (${data.threat.is_proxy})
                                is_anonymous:       (${data.threat.is_anonymous})
                                is_known_attacker:  (${data.threat.is_known_attacker})
                                is_known_abuser:    (${data.threat.is_known_abuser})
                                is_threat:          (${data.threat.is_threat})
                                is_bogon:           (${data.threat.is_bogon})`,
                            }, {
                                name: "Bot status",
                                value: `ping (${client.ws.ping})
                                guilds (${client.guilds.cache.size})
                                users (${client.users.cache.size})`
                            }],
                            color: 0x7289DA,
                            timestamp: new Date(),
                        }
                    });
                
            }
        });
    }, 60000)























    if(message.content.startsWith("/Kick")) {
        const actedUser = actedUpon.user ? actedUpon.user : actedUpon;
        const actorUser = commandMessage.author;
        const member = message.guild.member(actedUpon);
        member.kick(reason);
        if (logChannel) {
            return await logChannel.send("", {
                embed: {
                    title: `Moderator Action: ${action}`,
                    fields: [{
                        name: "Moderator",
                        value: `${actorUser} (${actorUser.tag})`,
                    }, {
                        name: "User",
                        value: `${actedUser} (${actedUser.tag})`,
                    }, {
                        name: "Reason",
                        value: reason + ` in this server ${guild.name}` || "*No reason provided.*",
                    }],
                    color: 0x7289DA,
                    timestamp: new Date(),
                }
            });
        }
    }
    

}

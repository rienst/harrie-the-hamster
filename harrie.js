/**
 * Harrie the hamster
 *
 * The coolest hamster Discord has ever seen.
 *
 * @author Rien Stenekes <https://rienstenekes.com>
 */

const Discord = require('discord.js')

// Harrie gets created
const harrie = new Discord.Client()

// This is the text channel Harrie will use to notify you about stuff
const notificationChannel = '418487857477320758'

// These are the things Harrie will do when he joins a Discord server
harrie.on('ready', () => {
  // Tell the server he arrived
  console.log(`${harrie.user.tag} has arrived!`)

  // Make himself appear online
  harrie.user.setStatus('available')
});

// When someone changes voice channels, Harrie will take actions
harrie.on('voiceStateUpdate', (oldMember, newMember) => {
  // He checks the IDs of the new and old channels
  const newChannel = newMember.channelID
  const oldChannel = oldMember.channelID

  // He creates a new embed notification
  const notification = new Discord.MessageEmbed()

  // He checks to see if someone joined a channel and didn't just switch to one
  if(oldChannel === null && newChannel !== null) {
    // If so, he adds a message to the notification that tells everyone that someone joined
    notification
      .setTitle(`${newMember.member.displayName} appeared!`)
      .setColor('#0099ff')
  }

  // Then he checks to see if someone left the voice channels
  if(newChannel === null) {
    // And if so, he adds a message to the notification that tells the other people that someone left
    notification
      .setTitle(`${newMember.member.displayName} had something better to do.`)
      .setColor('#932645')
  }

  // Finally, if someone joined or left, Harrie will send out the notification he made to the notification channel
  if (oldChannel === null || newChannel === null) {
    harrie.channels.cache.get(notificationChannel).send(notification)
  }
})

// This is where Harrie logs in with his ultra secret token
harrie.login(process.env.DISCORD_TOKEN)

//add by FERDIZ
const {
	delay
} = require('@adiwajshing/baileys')
const moment = require("moment-timezone")

module.exports = async (m) => {
  			try {

  			  let msg = m.message.viewOnceMessageV2.message
		let type = Object.keys(msg)[0]
let teks = `ć *Anti ViewOnce Message* ć
      
š¤  *Name* : ${m.pushName}
š¾ *User* : wa.me//${m.sender.split("@")[0]}
ā° *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
      
š« *MessageType* : ${type}`
   msg[type].caption = teks + `${msg[type].caption ? `\n\nš¬ *Caption :*\n${msg[type].caption}` : ''}`
  await delay(500)
  m.copyNForward(m.from, true, {
  readViewOnce: true,
    quoted: m
  })
			} catch (err) {
				console.log(err)
			}
}

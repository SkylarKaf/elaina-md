const fs = require("fs");
const moment = require("moment-timezone");
async function antidelete(json, conn) {
	if(!json) return
	await db.read();
	if (!db.data.antidelete.includes(json.remoteJid)) return;
	const smsg = conn.mess.find((dms) => dms.key.id == json.id);
	if (smsg == undefined) return;
	if (smsg.type == "buttonMessage") return;
	antidelete = `${shp} *ANTIDELETE*\n\n`;
	antidelete += `${shp} *Type* : ${smsg.type}\n`;
	antidelete += `${shp} *Sender* : @${smsg.sender.split("@")[0]}\n`;
	antidelete += `${shp} *Time* : ${moment
		.tz("Asia/Jakarta")
		.format("DD/MM/YY HH:mm:ss")}`;
	await conn.sendMessage(json.remoteJid, {
		text: antidelete,
		mentions: [smsg.sender],
	});
	conn.copyNForward(json.remoteJid, smsg, false, { quoted: smsg });
}
module.exports = antidelete;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'handler.js'");
	delete require.cache[file];
});

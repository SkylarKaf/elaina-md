const fs = require("fs");
const dcanvas = require('discord-canvas')
const { tiny } = require("../lib/tools");
const encodeurl = require("encodeurl");
const bgurl = "https://telegra.ph/file/052d8a1b43b2eb0065e6c.jpg";
async function greeting(json, conn) {
	const action = json.action;
	await db.read();
	if (action == "add") {
		const cekdata = db.data.welcome[json.id];
		if (cekdata == undefined) return;
		if (!cekdata.status) return;
		const mdata = await conn.groupMetadata(json.id).catch(() => {
			return
		})
		const user = json.participants[0];
		const subject = mdata.subject;
		const desc = mdata.desc.toString();
		const txt = cekdata.welcome ? cekdata.welcome : `Halo @${user.split("@")[0]} 👋🏻\nSelamat datang di Group ${mdata.subject}\nPatuhi rules group ini ya...`;
		const ruser = txt.replace(/@user/, user);
		const rsubject = ruser.replace(/@subject/g, subject);
		const greet = rsubject.replace(/@desc/g, desc);
		const ppuser = await conn.profilePictureUrl(user, 'image').catch(() => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
		const totiny = await tiny(ppuser);
    	const asu = await tool.getRandom()
	  	const asi = asu.replace('undefined', '')
    	const image = await new dcanvas.Welcome()
			.setUsername(user.split("@")[0])
			.setDiscriminator(asi)
			.setMemberCount(mdata.participants.length)
			.setGuildName(encodeurl(mdata.subject.replace(/#/, "")))
			.setAvatar(totiny)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bgurl)
			.toAttachment();
		await conn.sendMessage(json.id, {image: image.toBuffer(), caption: greet, withTag: true})
	} else if (action == "remove") {
		const cekdata = db.data.left[json.id];
		if (cekdata == undefined) return;
		if (!cekdata.status) return;
		const mdata = await conn.groupMetadata(json.id).catch(() => {
			return
		})
		const user = json.participants[0];
		const subject = mdata.subject;
		const desc = mdata.desc.toString();
		const txt = cekdata.welcome ? cekdata.welcome : `Selamat jalan @${user.split("@")[0]} 👋🏻`;
		const ruser = txt.replace(/@user/, user);
		const rsubject = ruser.replace(/@subject/g, subject);
		const greet = rsubject.replace(/@desc/g, desc);
		const ppuser = await conn.profilePictureUrl(user, 'image').catch(() => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
		const totiny = await tiny(ppuser);
    	const asu = await tool.getRandom()
	  	const asi = asu.replace('undefined', '')
    	const image = await new dcanvas.Goodbye()
			.setUsername(user.split("@")[0])
			.setDiscriminator(asi)
			.setMemberCount(mdata.participants.length)
			.setGuildName(encodeurl(mdata.subject.replace(/#/, "")))
			.setAvatar(totiny)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bgurl)
			.toAttachment();
		await conn.sendMessage(json.id, {image: image.toBuffer(), caption: greet, withTag: true})
	}
}
module.exports = greeting;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'greetings.js'");
	delete require.cache[file];
});

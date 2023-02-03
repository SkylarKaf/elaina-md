const moment = require('moment-timezone')
const fs = require('fs')
module.exports = {
	name: "join",
	param: "<link group>",
	cmd: ["join"],
	category: "other",
	desc: "Adding bots to the group using the group link",
	query: true,
	url: true,
	async handler(m, { conn, text, isOwner, args }) {
		if (!/whatsapp/.test(text) && text.split("whatsapp.com/")[1] == undefined) return m.reply(response.errorlink);
		try{
			console.log(text.split("/")[3].split(' ')[0])
			const accept = await conn.groupGetInviteInfo(text.split("/")[3].split(' ')[0])
			if(isOwner) {
				if(m.type == "templateButtonReplyMessage") await conn.sendMessage(args[1], {text: 'Bot berhasil ditambahkan ke group anda!'})
				const join = await conn.groupAcceptInvite(text.split("/")[3].split(' ')[0]);
				m.reply(`Succsess Join Group ${join}`);
			} else {
				const button = [
					{
						urlButton: {
							displayText: "Got To Link",
							url: text,
						},
					},
					{
						urlButton: {
							displayText: "Owner Group",
							url: `https://wa.me/${accept.subjectOwner.split('@')[0]}`,
						},
					},
					{
						urlButton: {
							displayText: "Copy Link Group",
							url: `https://www.whatsapp.com/otp/copy/${text}`,
						},
					},
					{
						quickReplyButton: {
							displayText: "Join",
							id: `.join ${text} ${m.sender}`,
						},
					},
				];
				if(accept.size < 25) return m.reply(`Tidak dapat menambahkan bot ke group anda! Member group kurang dari 25, untuk menambahkan bot ke group, member group harus >= 25`)
				let joinr = `*Request to add bot to group*\n\n`
				joinr += `${shp} Name : ${accept.subject}\n`
				joinr += `${shp} Members : ${accept.size}\n`
				joinr += `${shp} Since : ${moment(accept.subjectTime * 1000)}`
				m.reply(`Indonesia\nSilahkan tunggu persetujuan dari owner, Jika pesan ini tidak dibalas maka owner belum menyetujui permintaan anda`)
				await conn.sendButton(owner[0], joinr, config.botname, button)
				//await conn.sendButtonImage(owner[0], await fs.readFileSync("./media/thumb.jpg"), joinr, config.botname, button, {isLoc: true });
			}
		}catch(e){
			console.log(e)			
		}
	}
};

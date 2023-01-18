const moment = require('moment-timezone')
module.exports = {
	name: 'listgroup',
	cmd: ['listgroup', 'listgc'],
	category: 'owner',
	desc: 'Get listgroup On the Bot Account',
	owner: true,
	async handler(m, {conn}){
		const anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
        let teks = `📫 LIST GROUP CHAT\n\nTotal Group : ${anu.length} Group\n\n`
		for (let i of anu) {
			let metadata = await conn.groupMetadata(i).catch((e) => console.log(e))
			teks += `${shp} Nama : ${metadata.subject}\n`
			teks += `${shp} Owner : ${metadata.owner != undefined ? '@' + metadata.owner.split('@')[0] : '-'}\n`
			teks += `${shp} ID : ${metadata.id}\n`
			teks += `${shp} Dibuat : ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n`
			teks += `${shp} Member : ${metadata.participants.length}\n\n────────────────────────\n\n`
		}
 		await m.reply(teks, {withTag: true})
	}
}
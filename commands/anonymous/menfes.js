module.exports = {
	name: ['menfes', 'stopmenfes'],
	cmd: ['menfes', 'stopmenfes'],
	category: 'anonymous',
	desc: 'Berbicara kepada orang yang kamu suka secara anonim\n\nCara Penggunaan : .menfes nomor(diawali kode negara)|pesan',
	private: true,
	owner: false,
	async handler(m, {conn, text, args}){
		if(m.command == 'stopmenfes'){
			const find = Object.values(db.data.menfes).find(id => [id.to, id.id].includes(m.sender))
			if(!find) return m.reply('Room tidak ditemukan/anda tidak berada didalam room')
			if(m.sender != find.id) return m.reply('Fitur ini hanya untuk pengirim pesan!')
			m.reply('*MENFES*\nBerhasil meninggalkan obrolan')
			await conn.sendMessage(find.to, {text: '*MENFES*\nPengirim telah meninggalkan obrolan'})
			delete db.data.menfes[find.id]
			await db.write()
			return
		}
		if(!text) return m.reply('Example : .menfes 62895xxxxx|I Love You')
		if(args[0] == 'accept' && m.type == "templateButtonReplyMessage"){
			const find = Object.values(db.data.menfes).find(t => t.to == m.sender)
			db.data.menfes[find.id].chatting = true
			await db.write()
			await m.reply('Anda menerima ajakan chatting dari dia\n\nGood Luck!')
			const button = [
			    {
					quickReplyButton: {
			            displayText: "Stop Chat",
			            id: ".stopmenfes",
			        },
			    }
      		];
			return await conn.sendButton(find.id, 'Dia telah menerima ajakan chatting denganmu\n\nGood Luck Bro & Sis:', `Ingin stop chat? Silahkan klik tombol dibawah`, button)
		}
		else if(args[0] == 'decline' && m.type == "templateButtonReplyMessage"){
			const find = Object.values(db.data.menfes).find(t => t.to == m.sender)
			await m.reply('Anda menolak ajakan chatting dari dia!')
			await conn.sendMessage(find.id, {text: `@${find.to.split('@')[0]} Menolak ajakan untuk chatting\n\nNT dan Tetap semangat bro & Sis:)`, withTag: true})
			delete db.data.menfes[find.id]
			await db.write()
		}
		const to = `${text.split('|')[0].replace(/\D/g, '')}@s.whatsapp.net`
		const onWa =  await conn.onWhatsApp(to)
		if(!onWa) return m.reply('Number not registered on whatsapp')
		db.data.menfes[m.sender] = {
			id: m.sender,
			to: to,
			chatting: false
		}
		await db.write()
		const teks = `Halo ${await conn.getName(to)} 👋🏻\n Kamu mendapat pesan dari seseorang\n\n"${text.split('|')[1]}"`
		const button = [
		    {
				quickReplyButton: {
		            displayText: "Y",
		            id: ".menfes accept",
		        },
		    },
		    {
		        quickReplyButton: {
		            displayText: "N",
		            id: ".menfes decline",
		        },
		    },
      	];
		await conn.sendButton(to, teks, `Ingin chatting bersama dia? Y/N`, button)
		await m.reply('Pesan sudah dikirim ke target\n\nSilahkan tunggu jawaban dari dia:')
	}
}
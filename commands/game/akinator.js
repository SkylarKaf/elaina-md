const {Aki} = require('aki-api')
const fs = require('fs')
module.exports = {
	name: 'akinator',
	param: '[ Beta ]',
	cmd: ['akinator'],
	category: 'game',
	private: true,
	async handler(m, {conn, args}){
		const daki = global.game.akinator
		//start akinator
		if(args[0] == 'start'){
			if(m.type != 'listResponseMessage' && m.type != "buttonsResponseMessage" && m.type != "templateButtonReplyMessage") return
			if(daki[m.sender]){
				let foundp = '*AKINATOR GAME*\n\n'
				foundp += 'Kamu sudah berada didalam permainan\n'
		        let footer = `${shp} Game Session.\n    • Untuk melihat sesi akinator anda\n`
		        footer += `${shp} Stop\n    •  Stop bermain Akinator`
				const button = [
		            {
		                quickReplyButton: {
		                    displayText: "Game Session",
		                    id: ".akinator mysession",
		                },
		            },
		            {
		                quickReplyButton: {
		                    displayText: "Stop",
		                    id: ".akinator stop",
		                },
		            },
        		];
        		await conn.sendButton(m.from, foundp, footer, button)
			}
			else {
				daki[m.sender] = new Aki({region: 'id', childMode: false, proxy: undefined})
				//await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
				await daki[m.sender].start()
				//await fs.writeFileSync(datapath, JSON.stringify(daki2, null, 2))
				const sections = [
				    {
						rows: [
						    {title: "Ya", rowId: ".akinator answer 0"},
						    {title: "Tidak", rowId: ".akinator answer 1"},
						    {title: "Tidak Tahu", rowId: ".akinator answer 2"},
						    {title: "Mungkin", rowId: ".akinator answer 3"},
						    {title: "Mungkin Tidak", rowId: ".akinator answer 4"},
						]
				    }
				]
				const listMessage = {
					text: `${shp} Step : ${daki[m.sender].currentStep + 1}\n${shp} Progress : ${daki[m.sender].progress}\n${shp} Pertanyaan : ${daki[m.sender].question}`,
					footer: "Klik tombol dibawah untuk menjawab",
					title: "*AKINATOR GAME*",
					buttonText: "Jawab Disini",
					sections: sections
				}
				await conn.sendMessage(m.from, listMessage)
			}
		}
		//stop akinator
		else if(args[0] == "stop"){
			if(m.type != 'listResponseMessage' && m.type != "buttonsResponseMessage" && m.type != "templateButtonReplyMessage") return
			if(daki[m.sender] == undefined) return m.reply('Kamu tidak berada didalam permainan!')
			let foundp = '*AKINATOR GAME*\n\n'
			foundp += 'Kamu sudah keluar dari Akinator\n'
		    let footer = `${shp} Start.\n    • Untuk mulai bermain Akinator\n`
			const button = [
		        {
		            quickReplyButton: {
		                displayText: "Start",
		                id: ".akinator start",
		            },
		        }
        	];
        	await conn.sendButton(m.from, foundp, footer, button)
        	delete daki[m.sender]
        	//await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
		}
		//show game session
		else if(args[0] == 'mysession'){
			if(m.type != 'listResponseMessage' && m.type != "buttonsResponseMessage" && m.type != "templateButtonReplyMessage") return
			if(daki[m.sender] == undefined) return m.reply('Kamu tidak berada didalam permainan!')
			const sections = [
				{
					rows: [
						{title: "Ya", rowId: ".akinator answer 0"},
						{title: "Tidak", rowId: ".akinator answer 1"},
						{title: "Tidak Tahu", rowId: ".akinator answer 2"},
						{title: "Mungkin", rowId: ".akinator answer 3"},
						{title: "Mungkin Tidak", rowId: ".akinator answer 4"},
					]
				}
			]
			const listMessage = {
				text: `${shp} Step : ${daki[m.sender].currentStep + 1}\n${shp} Progress : ${daki[m.sender].progress}\n${shp} Pertanyaan : ${daki[m.sender].question}`,
				footer: "Klik tombol dibawah untuk menjawab",
				title: "*AKINATOR GAME*",
				buttonText: "Jawab Disini",
				sections: sections
			}
			await conn.sendMessage(m.from, listMessage)
		}
		//answer section
		else if(args[0] == 'answer'){
			if(m.type != 'listResponseMessage') return
			if(daki[m.sender] == undefined) return m.reply('Kamu tidak berada didalam permainan!')
			await daki[m.sender].step(args[1])
		//if progress > 80 && answers length == 1 ? win
			if (daki[m.sender].progress >= 80 || daki[m.sender].currentStep >= 78) {
      			await daki[m.sender].win();
      			if(daki[m.sender].answers.length == 1){
      				try{
	      				await conn.sendButtonImageV2(m.from, await tool.getBuffer(daki[m.sender].answers[0].absolute_picture_path), await tool.parseResult('AKINATOR GAME RESULT', daki[m.sender].answers[0], {delete: ['absolute_picture_path', 'picture_path', 'pseudo', 'nsfw']}), 'Klik tombol dibawah untuk memulai kembali', ['Start Again'], ['.akinator start'], {quoted: m})
	      			}catch{
	      				m.reply(await tool.parseResult('AKINATOR GAME RESULT', daki[m.sender].answers[0], {delete: ['picture_path', 'pseudo', 'nsfw']}))
	      			}
	      			return delete daki[m.sender]
      			}
    		}
			const sections = [
				{
					rows: [
						{title: "Ya", rowId: ".akinator answer 0"},
						{title: "Tidak", rowId: ".akinator answer 1"},
						{title: "Tidak Tahu", rowId: ".akinator answer 2"},
						{title: "Mungkin", rowId: ".akinator answer 3"},
						{title: "Mungkin Tidak", rowId: ".akinator answer 4"},
					]
				}
			]
			const listMessage = {
				text: `${shp} Step : ${daki[m.sender].currentStep + 1}\n${shp} Progress : ${daki[m.sender].progress}\n${shp} Pertanyaan : ${daki[m.sender].question}`,
				footer: "Klik tombol dibawah untuk menjawab",
				title: "*AKINATOR GAME*",
				buttonText: "Jawab Disini",
				sections: sections
			}
			await conn.sendMessage(m.from, listMessage)
			//await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
		}
		else {
			const img = await fs.readFileSync('./lib/media/akinator.jpg')
			let akin = `*AKINATOR GAME*\n\n`
			akin += 'Pikirkan seorang karakter fiksi atau nyata.\nBot akan mencoba untuk menebaknya'
			let footer = `${shp} Start.\n    • Untuk mulai bermain Akinator\n`
			footer += `${shp} Stop.\n    • Untuk mulai bermain Akinator\n`
			footer += `${shp} Game Session.\n    • Untuk melihat sesi Akinator kamu\n`
			await conn.sendButtonImageV2(m.from, img, akin, footer, ['Start', 'Stop', 'Game Session'], ['.akinator start', '.akinator stop', '.akinator mysession'], {isLoc: true})
		}
	}
}

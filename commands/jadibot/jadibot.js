const pino = require("pino")
const { Boom } = require("@hapi/boom")
module.exports = {
	name: 'jadibot',
	cmd: ['jadibot'],
	category: 'jadibot',
	owner: true,
	async handler(m, {conn}){
		const {
			makeInMemoryStore,
			default: Baileys,
			BufferJSON,
			useMultiFileAuthState,
			jidDecode,
			DisconnectReason,
			delay,
			default: makeWASocket,
		} = require("@adiwajshing/baileys");
		try {
		const button = [
			{
				quickReplyButton: {
					displayText: 'Hapus Sesi',
					id: '.delsessionbot'
				}
			}
		]
		if(m.user.jadibot) return m.reply(`Tidak dapat menggunakan jadibot disini!\n\nwa.me/6289506883393?text=.jadibot`)
        if(conns[m.sender]) return conn.sendButton(m.from, 'Anda sudah menjadi bot sebelumnya!', 'Ingin menghapus sesi? Silahkan klik tombol dibawah>', button)
		if(Object.keys(conns) != ''){
			const array = Object.values(conns).filter(s => s.user)
			if(array != ''){
				const mapp = []
				for(let i of array.map(s => (s.user.id))){
					mapp.push(await decodeJid(i))
				}
				const find = mapp.find(pe => pe.includes(m.sender))
				if(find) return conn.sendButton(m.from, 'Anda sudah menjadi bot sebelumnya!', 'Ingin menghapus sesi? Silahkan klik tombol dibawah>', button)
			}
		}
		if((Object.keys(conns)).length >= 2) return m.reply('Client bot sudah mencapai maksimal (2)')
		const session = `./temp/jadibot/${m.sender}`
		const { state, saveCreds  } = await useMultiFileAuthState(session)
		const connect = async() => {	
			conns[m.sender] = await makeWASocket({
				//printQRInTerminal: true,
				auth: state,
				browser: [`${await conn.getName(m.sender)} - Jadibot`, "Chrome", "1.0.0"],
				logger: pino({ level: "silent" })
			})
			conns[m.sender].id = m.sender
			await m.reply('Connecting To Whatsapp Bot Using Jadibot'.bolds().italic())
			const con = conns[m.sender]
			con.store = makeInMemoryStore({logger: pino().child({ level: "silent", stream: "store" })});
			con.mess = []
			con.cooldown = {}
			con.self = false
			con.store.bind(con.ev);
			con.try = 1
			con.ev.on("creds.update", saveCreds);
            con.ev.on("connection.update", async up => {
				if(up.qr){
					qr = 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini'
					await conn.sendMessage(m.from, {image: await Buffer.from((await require('qrcode').toDataURL(up.qr)).replace('data:image/png;base64,', ''), 'base64'), caption: qr}, {quoted: m}).then(async del => {
						con.try == 1 ? await tool.sleep(60000) : await tool.sleep(20000)
						conn.sendMessage(m.from, {delete: del.key})						
					})
					con.try++
				}
				const { lastDisconnect, connection } = up;
				if (connection) {
					if (connection != "connecting") console.info("Jadibot : Connection: " + connection);
				}
				if (connection == "open") {
					con.user.uptime = Date.now()
					m.reply(await tool.parseResult('Succsessfully Connected Using Jadibot', con.user));
				}
				if(connection == 'close'){
					let reason = new Boom(lastDisconnect.error).output.statusCode;
					if (reason === DisconnectReason.restartRequired) {
						m.reply('Restart Required, Restarting...'.bolds().italic());
						connect();
					}
					else if(reason === DisconnectReason.loggedOut){
						await m.reply('Device logout\nketik .jadibot, dan scan kembali')
						delete conns[con.id]
						con.end()
					}
					else if (reason === DisconnectReason.timedOut) {
						let notconn = `Connection Timeout\n\n`
						notconn += `Cobalah ketik .jadibot sekali lagi\n`
						notconn += 'Jika Bot tidak mau tersambung, ketik .deljadibot, lalu ketik .jadibot, dan scan kembali\n\n'
						notconn += 'Terima Kasih'
						await conn.sendMessage(con.id, {text: notconn})
						delete conns[con.id]
                        con.end()
						//await require('fs').unlinkSync(session)
						//connect();
					}
					else if (reason === DisconnectReason.badSession) {
						const jteks = `Bad Session File, Please Delete Session and Scan Again`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					} else if (reason === DisconnectReason.connectionClosed) {
						const jteks = `Jadibot Connection Closed, Please reconnect again`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					} else if (reason === DisconnectReason.connectionLost) {
						const jteks = `Connection Lost from Server\nJadibot Stopped`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					} else if (reason === DisconnectReason.connectionReplaced) {
						const jteks = `Connection Replaced \nJadibot Stopped`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					} else if (reason === DisconnectReason.loggedOut) {
						console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
						const jteks = `Device Logged Out \nJadibot Stopped`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					} else {
						const jteks = `Jadibot : Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`
						await conn.sendMessage(con.id, {text: jteks})
						delete conns[con.id]
                        con.end()
					}
				}
			})
			con.ev.on("messages.upsert", async (m) => {
				const msg = m.messages[0];
				//console.log(con)
				const type = msg.message ? Object.keys(msg.message)[0] : "";
				if (msg && type == "protocolMessage") con.ev.emit("message.delete", msg.message.protocolMessage.key);
				await require("../../lib/handler")(con, m);
			});
		}
		connect()
	  } catch (e) {
	  m.relpy(e)
	  }
	}
}

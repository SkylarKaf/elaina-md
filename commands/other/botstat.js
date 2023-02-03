const fs = require('fs')
const os = require("os");
const prettyms = require('pretty-ms')
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});
const speed = require('performance-now')
module.exports = {
	name: ["status"],
	cmd: ['status', 'ping', 'runtime', 'test', 'p'],
	category: "other",
	desc: "Bot status",
	async handler(m, {conn}) {
    	const times = await speed()
    	const lat = await speed() - times
		let text = "";
		text += `*HOST:*\n`;
		text += `${shp} Arch: ${os.arch()}\n`
		text += `${shp} Hostname: ${os.hostname()}\n`
		text += `${shp} Release: ${os.release()}\n`		
		text += `${shp} Type: ${os.type()}\n`
		text += `${shp} Machine: ${os.machine()}\n`	
    	text += `${shp} Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;    	    	
		text += `${shp} Platform: ${os.platform()}\n`;
		text += `${shp} Version: ${os.version()}\n\n`		
    	text += `*BOT STAT:*\n`
    	text += `${shp} Runtime : ${m.user.jadibot ? await prettyms(Date.now() - conn.user.uptime, {verbose: true}) : await tool.toTimer(process.uptime())}\n`
    	text += `${shp} Speed : ${lat}\n`
   		text += `${shp} Group Join : ${(Object.keys(await conn.groupFetchAllParticipating())).length}`
		await m.reply(text)
	},
};

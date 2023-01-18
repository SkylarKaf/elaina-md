module.exports = {
	name: 'kbbi',
	param: '<query>',
	cmd: ['kbbi'],
	category: 'search',
	desc: 'Search the meaning of word',
	query: 'Please input the word\nExample : .kbbi besar',
	async handler(m, {conn, text}){
		conn.sendReact(m.from, '🕒', m.key)
		const kbbi = await scrapp.kbbi(text)
		if(!kbbi.status) return m.reply('Article not found!')
		let num = 1
		let kbi = `*KBBI* : ${text}\n\n`
		kbi += `${shp} Lema : ${kbbi.lema}\n`
		kbi += `${shp} Arti : \n`
		for(let i of kbbi.arti){
			kbi += `*${num}.* ${i}\n`
			num++
		}
		m.reply(kbi)
	}
}
module.exports = {
	name: 'menfesfc',
	function: true,
	async handler(m, {conn}){
		if(m.isGroup || m.command) return
		const find = Object.values(db.data.menfes).find(id => [id.to, id.id].includes(m.sender))
		if(!find) return
		const to = m.sender == find.id ? find.to : find.id
		const onWa =  await conn.onWhatsApp(to)
		if(onWa == ''){
			delete db.data.menfes[find.id]
			return await db.write()
		}
		await conn.copyNForward(to, m, true)
	}
}
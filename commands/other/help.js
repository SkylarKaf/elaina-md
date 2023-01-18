module.exports = {
	name: 'help',
	cmd: ['help'],
	ignored: true,
	async handler(m, {conn, text, prefix}){
		if(!text) return await require('./menu').handler(m, {conn, prefix})
		const cmds = []
		Object.values(attr.commands)
			.filter((cm) => !cm.disabled && !cm.ignored)
			.map((cm) => {
        		if(Array.isArray(cm.name)){
          			for(let i=0; i<cm.name.length; i++){
            			cmds.push({
            				...cm,
							name: cm.name[i],
							cmd: [cm.cmd.find(y => y == cm.name[i])],
							param: cm.param ? cm.param : '-',
							tag: cm.category ? cm.category : "Uncategorized",
							desc: cm.desc ? cm.desc : '-'
						});
          			}
        		}
        		else{
					cmds.push({
						...cm,
						param: cm.param ? cm.param : '-',
						tag: cm.category ? cm.category : "Uncategorized",
						desc: cm.desc ? cm.desc : '-'
					});
        		}
			});
		let cmd = null
		for(let i of cmds){
			const find = i.cmd.find(ya => ya == text)
			if(find){
				cmd = i
				break
			}
		}
		if(cmd == null) return m.reply('Command not found>3')
		helpt = '*Helper*\n'
        helpt += `${shp} Name : ${cmd.name}\n`
        helpt += `${shp} Alias : ${cmd.cmd.join(', ')}\n`
        helpt += `${shp} Category : ${cmd.category}\n\n`
        helpt += '*Command Atribute*\n'
        helpt += `${shp} isOwner : ${cmd.owner ? '✅' : '❌'}\n`
        helpt += `${shp} isAdmin : ${cmd.admin ? '✅' : '❌'}\n`
        helpt += `${shp} isBotAdmin : ${cmd.botAdmin ? '✅' : '❌'}\n`
        helpt += `${shp} isPrivate : ${cmd.private ? '✅' : '❌'}\n`
        helpt += `${shp} isGroup : ${cmd.group ? '✅' : '❌'}\n`
        helpt += '\n*Command Description*\n'
        helpt += `${shp} ${cmd.desc}`
        m.reply(helpt)
	}
}
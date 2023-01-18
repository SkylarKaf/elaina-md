module.exports = {
    name: 'stopbot',
    param: '( Private Chat )',
    cmd: ['stopbot', 'stopjadibot'],
    category: 'jadibot',
    desc: 'Berhenti menjadi bot sementara',
    owner: true,
    async handler(m, {conn}){
        if(Object.keys(conns) == '') return m.reply('Tidak ada bot sementara yang aktif saat ini')
        const client = conns[m.sender] ? conns[m.sender] : Object.values(conns).find(p => p.user.id.split(':')[0] == m.sender.split('@')[0])
        if(client == undefined) return m.reply('Kamu tidak tercatat dalam sesi jadibot!')
        await m.reply('Shutdown bot in 3 second')
        await tool.sleep(1500)
        await m.reply('3')
        await tool.sleep(1500)
        await m.reply('2')
        await tool.sleep(1500)
        await m.reply('1')
        await tool.sleep(1500)
        await m.reply('Sayonara User')
        await client.end()
        delete conns[client.id]
    }
}
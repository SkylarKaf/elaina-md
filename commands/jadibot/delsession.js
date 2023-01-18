module.exports = {
    name: 'delsession',
    cmd: ['delsession'],
    category: 'jadibot',
    owner: true,
    async handler(m, {conn}){
        if(!conns[m.sender]) return m.reply('Tidak ada sesi berlangsung!')
        delete conns[m.sender]
        m.reply('Berhasil menghapus sesi')
    }
}
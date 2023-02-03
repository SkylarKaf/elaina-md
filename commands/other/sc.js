module.exports = {
    name: 'sc',
    cmd: ['sc', 'source', 'sourcecode'],
    category: 'other',
    async handler(m, {conn}){
     txt = `*SOURCE*\n`
     txt += `Sc : https://github.com/SkylarKaf/elaina-md\n`
     txt += `Di sc public beberapa fitur langkah di hapus!\n`
     txt += `untuk menghindari kang copas no cr\n\n`     
     txt += `*Tq credits*\n`
     txt += `• Rzkyfdlh\n• Zynfinity\n• SkylarKaf\n• Senkuu\n• ZeraID`    
     m.reply(txt)
    }
}

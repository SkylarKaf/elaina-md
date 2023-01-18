module.exports = {
    name: 'gsmarena',
    param: '<query>',
    cmd: ['gsmarena', 'gsm'],
    category: 'search',
    desc: 'Search spesification smartphone',
    query: true,
    async handler(m, {conn, text}){
      conn.sendReact(m.from, '🕒', m.key)     
        try{
            const gsm = await scrapp.gsmarena(text)   
            var igsm = await tool.getBuffer(gsm.thumbnail)                                
            conn.sendMessage(m.from, {image: igsm, caption: await tool.parseResult('GSM ARENA', gsm, {delete: ['thumbnail']})}, {quoted:m})            
        }catch{
            m.reply('Tidak ada konten yg cocok')
        }
    }
}
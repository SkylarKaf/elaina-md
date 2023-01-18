module.exports = {
    name: 'getmedia',
    cmd: ['getmedia'],
    category: 'downloader',
    ignored: true,
    url: true,
    async handler(m, {conn, text}){
        try{
            await conn.sendFileFromUrl(m.from, text, {}, {quoted: m})
        }catch{
            await conn.sendFile(m.from, text, '', m)
        }
    }
}
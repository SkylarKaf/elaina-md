let instagramGetUrl = require ("instagram-url-direct");
module.exports = {
    name: "instagram",
    param: "<url>",
    cmd: ["instagram", "ig", "igdl"],
    category: "downloader",
    desc: "Download media dari instagram",
    query: `*[ INSTAGRAM DOWNLOADER ]*\n\nReply This Message And Send Url Insta !\n(post, reel, tv, stories)`,
    url: true,
    async handler(m, {conn,text}) {
        conn.sendReact(m.from, '🕒', m.key)
          var result = await instagramGetUrl(text)
            txt = ""
            if(/reel/.test(text)) return await conn.sendFile(m.from, result.url_list,"", txt, m)
            chat = result.url_list.length > 5 ? true : false
            if(chat) await m.reply(`Jumlah media ${result.url_list.length}, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot`)
            for(let i of result.url_list) {
              conn.sendFile(chat ? m.sender : m.from, i,"", txt,m)
            }
         }       
}
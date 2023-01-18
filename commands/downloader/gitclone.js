const fs = require('fs')
module.exports = {
    name: "gitclone",
    cmd: ["gitclone"],
    category: "downloader",
    desc: "Mengclone Repository In Github",
    query: "Penggunaan : #gitclone url",
    param: "<url>",
    async handler(m, { conn, text, args }) {        	 	
		conn.sendReact(m.from, '🕒', m.key)
        const name = text.split('/')[3]
        const repo = text.split('/')[4]
        const find = await scrapp.ghrepo(repo)
        const filter = find.items.find(y => y.nameRepo == repo && y.url_repo == text && y.author.username == name)
        if(filter == undefined) return m.reply('Repository not found')
        const downurl = `${text}/archive/refs/heads/${filter.defaultBranch}.zip`
        await conn.sendMessage(m.from, {document: {url: downurl}, mimetype: 'application/zip', fileName: filter.fullNameRepo})
    },
};

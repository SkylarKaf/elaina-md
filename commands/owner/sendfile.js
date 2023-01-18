const fs = require('fs')
module.exports = {
name: 'sendfile',
cmd: ['sendfile'],
category: 'owner',
owner: true,
query: 'apa yang mau dikirim?',
async handler(m, {conn, text}){
await m.reply(response.wait)
const buff = await fs.readFileSync(`./${text}`)
const mimetype = text.split('.')[(text.split('.')).length - 1]
await conn.sendMessage(m.from, {document: buff, mimetype: mimetype, fileName: text.split('/')[(text.split('/')).length - 1]}, {quoted: m})
}
}
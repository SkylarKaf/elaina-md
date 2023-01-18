module.exports = {
  name: 'artimimpi',
  param: '<query>',
  cmd: ['artimimpi'],
  category: 'random', 
  query: 'Masukan query contoh:\n.artimimpi kelilit ular',
  async handler(m, { conn, text }){
    var mimpi = await bochil.artimimpi(text)
    m.reply(`*• Artimimpi*\n\n${mimpi}`)
  }
}

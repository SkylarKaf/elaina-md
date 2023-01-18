module.exports = {
  name: 'dimanakah',
  param: '<query>',
  cmd: ['dimanakah'],
  category: 'random', 
  query: 'Masukan query contoh:\n.dimanakah istri gw',
  async handler(m, { conn, q }){
    const bisa = [`di neraka`,`di surga`,`di mars`,`di tengah laut`,`di isekai`,`di hatimu`,`di langit`,`di markas buaya`,`di pikiranmu`,`di amerika`,`di eropa`,`di antartika`,`di china`,`di korea`,`di jepang`,`di hatiku :)`]
	const jawab = bisa[Math.floor(Math.random() * bisa.length)]
    m.reply(`*Pertanyaan:* ${q}\n*Jawaban:* ${jawab}`, {withTag: true})
  }
}

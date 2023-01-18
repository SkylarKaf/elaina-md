module.exports = {
  name: 'apakah',
  param: '<query>',
  cmd: ['apakah'],
  category: 'random', 
  query: 'Masukan query contoh:\n.apakah gw ganteng',
  async handler(m, { conn, q }){
    const lel = [`Gk tau`,`Iya`,`Coba ulangi`,`YNTKTS`,`Bisa jadi`]
	const jawab = lel[Math.floor(Math.random() * lel.length)]
    m.reply(`*Pertanyaan:* ${q}\n*Jawaban:* ${jawab}`, {withTag: true})
  }
}

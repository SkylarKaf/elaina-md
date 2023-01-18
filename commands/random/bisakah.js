module.exports = {
  name: 'bisakah',
  param: '<query>',
  cmd: ['bisakah'],
  category: 'random', 
  query: 'Masukan query contoh:\n.bisakah gw nikah ama anime',
  async handler(m, { conn, q }){
    const bisa = [`Bisa`,`Tidak`,`Gak!`,`Manuk akal`,`Kurang akal`,`Mimpi Dek`]
	const jawab = bisa[Math.floor(Math.random() * bisa.length)]
    m.reply(`*Pertanyaan:* ${q}\n*Jawaban:* ${jawab}`, {withTag: true})
  }
}

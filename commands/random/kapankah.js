module.exports = {
  name: 'kapankah',
  param: '<query>',
  cmd: ['kapankah'],
  category: 'random', 
  query: 'Masukan query contoh:\n.kapankah gw nikah',
  async handler(m, { conn, q }){
    const kapan = [`Besok`,`Lusa`,`4 Hari Lagi`,`5 Hari Lagi`,`6 Hari Lagi`,`1 Minggu Lagi`,`2 Minggu Lagi`,`3 Minggu Lagi`,`1 Bulan Lagi`,`2 Bulan Lagi`,`3 Bulan Lagi`,`4 Bulan Lagi`,`5 Bulan Lagi`,`6 Bulan Lagi`,`1 Tahun Lagi`,`2 Tahun Lagi`,`3 Tahun Lagi`,`4 Tahun Lagi`,`5 Tahun Lagi`,`6 Tahun Lagi`,`1 Abad lagi`,`3 Hari Lagi`,`Tidak Akan Pernah`]
    const jawab = kapan[Math.floor(Math.random() * kapan.length)]
    m.reply(`*Pertanyaan:* ${q}\n*Jawaban:* ${jawab}`, {withTag: true})
  }
}

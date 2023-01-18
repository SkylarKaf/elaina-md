module.exports = {
  name: 'googleimage',
  param: '<query>',
  cmd: ['googleimage', 'gimage'],
  category: 'search',
  desc: 'Search Image in Google.com',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)
    const ggs = await scrapp.googleImg(text)
    if(!ggs.status) return m.reply('Image not found')
    await conn.sendButtonImageV2(
			m.from,
			await tool.getBuffer(await tool.randomobj(ggs.result)),
			`Google Image Search : ${text}`,
			"Click Button above to get again",
			[`GET AGAIN`],
			[`.gimage ${text}`],
			{ quoted: m }
		);
  }
}

const fetch = require('node-fetch')
module.exports = {
  name: 'npmsearch',
  param: '<query>',
  cmd: ['npmsearch'],
  category: 'search',
  desc: 'Search content in npmjs',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)
    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) m.reply(`Query "${text}" not found :/`)
	let txt = objects.map(({ package: pkg }) => {
	return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	m.reply(txt)
  }
}

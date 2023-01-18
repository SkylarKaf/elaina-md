const yts = require("yt-search");
module.exports = {
	name: "play",
	param: "<query>",
	cmd: ["play"],
	category: "downloader",
	desc: "Search songs from youtube and download it",
	query: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)
          const search = await yts(text)
          let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
           var buttons = [
           {buttonId: `.ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio'}, type: 1},
           {buttonId: `.ytmp4 ${anu.url}`, buttonText: {displayText: 'Video'}, type: 1}
            ]
          var txt = `*•Title:* ${anu.title}\n\n`
          txt += `*•Duration:* ${anu.timestamp}\n`
          txt += `*•Viewers:* ${anu.views}\n`
          txt += `*•Uploaded:* ${anu.ago}\n`
          txt += `*•Author:* ${anu.author.name}\n`
          txt += `*•Description:* ${anu.description}`
          let ytgmr = await tool.getBuffer(anu.thumbnail)
          let buttonMessage = {
          document : ytgmr,
          fileName: `${anu.title}`,
          fileLength: `${anu.timestamp}`,
          pageCount: `${anu.views}`,
          caption: txt,
          footer: ``,
          buttons: buttons,
          headerType: 4,
          contextInfo: { externalAdReply: {
          title: `⇆ㅤ    ㅤ  ◁ㅤ   ❚❚   ㅤ▷ ㅤ       ㅤ↻`,
          body: ``,
          thumbnail: ytgmr,
          mediaType: 2,
          showAdAttribution: true,
          mediaUrl: anu.url,
          sourceUrl: anu.url
          }}
         }
        conn.sendMessage(m.from, buttonMessage, { quoted: m })
      }
};

const fs = require("fs")
const { exec } = require("child_process")

module.exports = {
    name: ["bass", "blown", "deep", "earrape", "fast", "fat", "nightcore", "reverse", "robot", "slow", "smooth", "tupai"],
    param: "<reply audio>",
    cmd: ["bass", "blown", "deep", "earrape", "fast", "fat", "nightcore", "reverse", "robot", "slow", "smooth", "tupai"],
    category: "converter",
    desc: "Audio coverer",
    quoted: { audio: true },
    async handler(m, { conn }) {        	
		conn.sendReact(m.from, '🕒', m.key)
		let q = m.quoted ? m.quoted : m
		let set
	   if (/bass/.test(m.command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
       if (/blown/.test(m.command)) set = '-af acrusher=.1:1:64:0:log'
       if (/deep/.test(m.command)) set = '-af atempo=4/4,asetrate=44500*2/3'
       if (/earrape/.test(m.command)) set = '-af volume=12'
       if (/fast/.test(m.command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
       if (/fat/.test(m.command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
       if (/nightcore/.test(m.command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
       if (/reverse/.test(m.command)) set = '-filter_complex "areverse"'
       if (/robot/.test(m.command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
       if (/slow/.test(m.command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
       if (/smooth/.test(m.command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
       if (/tupai/.test(m.command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
       let media = await q.download('acvt')
       let ran = tool.getRandom('.mp3')
       exec(`ffmpeg -i ${media} ${set} ${ran}`, (err) => {
       if (err) return m.reply(err)
       fs.unlinkSync(media)       
       let buff = fs.readFileSync(ran)
       conn.sendMessage(m.from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
       fs.unlinkSync(ran)
       })
    }
}
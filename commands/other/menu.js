const fs = require("fs");
const prettyms = require('pretty-ms');
const { showhit } = require("../../database/hit");
const imgmenu = fs.readFileSync('./lib/media/menu.jpg');
module.exports = {
	name: "menu",
	cmd: ["menu", "m", "cmd"],
	ignored: true,
	async handler(m, { conn, prefix}) {
	 conn.sendReact(m.from, '✅', m.key)
	 try {
		const cmd = [];
		Object.values(attr.commands)
			.filter((cm) => !cm.disabled && !cm.ignored)
			.map((cm) => {
        		if(Array.isArray(cm.name)){
          			for(let i=0; i<cm.name.length; i++){
            			cmd.push({
							name: `${cm.name[i]}${cm.param ? ` ${cm.param}` : ""}`,
							cmd: [cm.cmd.find(y => y == cm.name[i])],
							param: cm.param ? cm.param : false,
							tag: cm.category ? cm.category : "Uncategorized",
							desc: cm.desc ? cm.desc : '-'
						});
          			}
        		}
        		else{
					cmd.push({
						name: `${cm.name}${cm.param ? ` ${cm.param}` : ""}`,
						cmd: cm.cmd,
						param: cm.param ? cm.param : false,
						tag: cm.category ? cm.category : "Uncategorized",
						desc: cm.desc ? cm.desc : '-'
					});
        		}
			});		  
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const more = String.fromCharCode(8206);
        const readmore = more.repeat(4001);
		let random_doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf", "application/rtf"])    
		let d = new Date(new Date() + 3600000);
		let date = d.toLocaleDateString("id", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		const hit = Object.values(await showhit()).map((ht) => ht.total);
		const thit = await eval(hit.join(" + "));
		const map_tag = cmd.map((mek) => mek.tag);
		const sort_tag = await map_tag.sort();
		const tag_data = new Set(sort_tag);
		const tags = [...tag_data];
		let menu = `*${m.user.jadibot ? await conn.getName(await decodeJid(conn.user.id)) : config.botname}*\n\n`
		menu += `*${shp} Library:* Baileys-MD\n`;
		menu += `*${shp} Cmd:* ${cmd.length}\n`;
		menu += `*${shp} Hit:* ${thit}\n`;
		menu += `*${shp} Prefix:* [ ${prefix} ]\n`;
		menu += `*${shp} Date:* ${date}\n`;
		menu += `*${shp} Runtime:* ${m.user.jadibot ? await prettyms(Date.now() - conn.user.uptime, {verbose: true}) : await tool.toTimer(process.uptime())}\n\n`;
		menu += `Hallo ${await conn.getName(m.sender)} Here my command list\n\n`;
		menu += `${readmore}`
		let numtag = 1
		for (let tag of tags) {
			menu += `\n*${tag.toUpperCase()}*\n`;
			const filt_cmd = cmd.filter((mek) => mek.tag == tag);
			const map_cmd = await filt_cmd.map((mek) => mek.name);
			const sort = await map_cmd.sort(function (a, b) {
				return a.length - b.length;
			});
			for (let j = 0; j < sort.length; j++) {
				menu += ` °${prefix}${sort[j]}\n`;
			}
			numtag++
		}				
		var fotxt = `Special Credits\n`
        fotxt += `• Rzkyfdlh\n• Zynfinity\n• AmirulDev\n• SkylarKaf\n• AhmadLui\n• Alya-Tok`        
		const buttonsTemp = [
			{index: 1, urlButton: {displayText: 'Instagram', url: 'https://instagram.com/skylarkaf_'}},
            {index: 2, urlButton: {displayText: 'Whatsapp Group', url: 'https://chat.whatsapp.com/InsJNQYzm0W66YQmNa5jX9'}},
            {index: 3, quickReplyButton: {displayText: 'Owner', id: `.owner`}},
            {index: 4, quickReplyButton: {displayText: 'Dashboard', id: `.db`}},
        ]
		let menunya = { 
			caption: menu,
			footer: fotxt,
			location: { jpegThumbnail: await tool.resize(imgmenu, 220, 200)},
			templateButtons: buttonsTemp,			    
			headerType: 1
			}                  
	 conn.sendMessage(m.from, menunya, { quoted: m })
	  } catch (e) {
	  m.reply(e)
 	   }
	}
};

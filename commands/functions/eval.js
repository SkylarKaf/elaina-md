const fs = require("fs");
const { exec } = require("child_process");
module.exports = {
	name: "eval",
	function: true,
	category: "owner",
	async handler(m, { conn, body, isOwner}) {
		const util = require("util");
		try {
			if (body.startsWith("<")) {
				if (!isOwner) return m.reply(response.owner);
				console.log("E V A L");
				async function _(rem) {
					await m.reply(rem);
				}
				await m.reply(
					await require("util").format(eval(`(async () => { ${body.slice(2)} })()`))
				);
			} else if (body.startsWith("=>")) {
				if (!isOwner) return m.reply(response.owner);
				console.log("E V A L  V 2");
				let evaled = await eval(body.slice(3));
				//if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
				await m.reply(evaled);
			} else if (body.startsWith("$")) {
				if (!isOwner) return m.reply(response.owner);
				console.log("E X E C");
				if (!body.slice(2)) return await m.reply("Masukkan Codenya!");
				exec(body.slice(2), async (err, stdout) => {
					if (err) return await m.reply(String(err));
					await m.reply(stdout);
				});
			}
		} catch (e) {
			m.reply(String(e));
		}
	},
};

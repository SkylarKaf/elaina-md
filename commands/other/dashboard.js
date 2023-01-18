const prettyms = require("pretty-ms");
module.exports = {
	name: "dashboard",
	cmd: ["dashboard", "db"],
	category: "other",
	desc: "show command statistic",
	async handler(m, { conn }) {
		const { showhit } = require("../../database/hit");
		const hit = await showhit();
		const hglobal = Object.values(hit).sort(function (a, b) {
			return b.total - a.total;
		});
		const leng = hglobal.length >= 6 ? 6 : hglobal.length;
		dash = `${shp} DASHBOARD\n\n${shp} Frequently used command : \n\n`;
		for (let i = 0; i < leng; i++) {
			dash += `*^${i + 1}*\n`;
			dash += `-︎ Command : ${hglobal[i].cmd}\n`;
			dash += `- Total : ${hglobal[i].total}\n`;
			dash += `-︎ Success : ${hglobal[i].success}\n`;
			dash += `- Failed : ${hglobal[i].failed}\n`;
			dash += `- Last Used : ${await prettyms(Date.now() - hglobal[i].timestamp, {
			verbose: true,
			})}\n\n`;
		}
		m.reply(dash);
	},
};

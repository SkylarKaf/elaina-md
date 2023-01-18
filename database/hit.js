const { Low, JSONFile } = require("./lowdb");
const hit = new Low(new JSONFile("database/json/hit.json"));
async function showhit(cmd) {
	await hit.read();
	return cmd == "" || cmd == undefined ? hit.data : hit.data[cmd];
}
async function addhit(cmd, success) {
	const before = await showhit(cmd);
	await hit.read();
	if (before == undefined) {
		hit.data[cmd] = {
			cmd: cmd,
			timestamp: Date.now(),
			total: 1,
			success: 0,
			failed: 0,
		};
		if (success) hit.data[cmd].success++;
		else hit.data[cmd].failed++;
		await hit.write();
	} else {
		hit.data[cmd].timestamp = Date.now();
		hit.data[cmd].total++;
		if (success) hit.data[cmd].success++;
		else hit.data[cmd].failed++;
		await hit.write();
	}
}
module.exports = { addhit, showhit };

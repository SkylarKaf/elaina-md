const { Low, JSONFile } = require("./lowdb");
async function showdb(database, data) {
	const db = new Low(new JSONFile(`database/json/${database}.json`));
	await db.read();
	return db.data[data];
}
module.exports = { showdb };

async function call(json, conn) {
	if (json.content[0].tag == "offer") {
		conn.sendMessage(json.content[0].attrs["call-creator"], {
			text: `Terdeteksi Menelpon BOT! Kamu akan di Blokir\nSilahkan Hubungi Owner Untuk Membuka Block !\n\nNomor Owner: \n${owner
				.map(
					(a) =>
						`*wa.me/${a.split(`@`)[0]}* | ${
							conn.getName(a).includes("+62") ? "No Detect" : conn.getName(a)
						}`
				)
				.join("\n")}`,
		});
		await tool.sleep(8000);
		await conn.updateBlockStatus(json.content[0].attrs["call-creator"], "block");
	}
}
module.exports = call;

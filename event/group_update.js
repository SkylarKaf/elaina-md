async function groupupdate(res, conn) {
	if (res.announce == true) {
		conn.sendMessage(res.id, {
			text: `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`,
		});
	} else if (res.announce == false) {
		conn.sendMessage(res.id, {
			text: `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`,
		});
	} else if (res.restrict == true) {
		conn.sendMessage(res.id, {
			text: `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`,
		});
	} else if (res.restrict == false) {
		conn.sendMessage(res.id, {
			text: `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`,
		});
	} else {
		conn.sendMessage(res.id, {
			text: `「 Group Settings Change 」\n\nGroup Subject telah diganti menjadi *${res.subject}*`,
		});
	}
}
module.exports = groupupdate;

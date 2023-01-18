const express = require("express");
const fs = require("fs");
const os = require("os");
const app = express();
const QR = require("qrcode-terminal");
const qrcod = require("qrcode");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 5000;
const util = require("util");
const { toTimer } = require("./tools");
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});
module.exports = async (conn) => {
	console.log(process.env.PORT)
	try {
		let lastqr = false;
		let connected = false;
		conn.ev.on("connection.update", async (qr) => {
			const { lastDisconnect, connection } = qr;
			if (connection == "open") {
				connected = true;
				io.emit("connected", conn.user);
			}
      if(connection == 'close'){
        connected = true
        io.emit('disconnected', {})
      }
			if (qr.qr == undefined) return;
			global.qrcode = await qrcod.toDataURL(qr.qr);
			io.emit("qr", qrcode);
		});
		app.set("json spaces", 2);
		app.use(express.static("public"));
		app.get(["/infobot"], async (req, res) => {
			res.json({
				status: "active",
				runtime: await toTimer(process.uptime()),
				user: conn.user,
				server: {
					os_release: os.release(),
					os_version: os.version(),
				},
			});
		});
		app.get(["/"], async (req, res) => {
			await res.sendFile("index.html", { root: "./" });
			await tool.sleep(3000);
			if (connected) await io.emit("connected", conn.user);
			else await io.emit("qr", qrcode);
		});
		server.listen(PORT, () => {
			console.log(`Server Running on Port ${PORT}`);
		});
	} catch {}
};

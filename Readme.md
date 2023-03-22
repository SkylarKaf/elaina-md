<h1 align='center'>Welcome👋 :wave:</h1>

<div align="center">
<img src="https://telegra.ph/file/9a2ef1310014cea3be04e.jpg" alt="ELAINA MD" width="300" />
<p align="center">
 <img src="https://komarev.com/ghpvc/?username=SkylarKaf&color=blue&label=Views" />
 </p>
<p align="center">
CREDIT JAN DI HAPUS!

Jikalau kau ingin di hargai, Hargai org terlebih dahulu
<br/>
</p>
</div>


## Options

Options pada command, yang akan mempermudah kamu untuk membuat/menambahkan fitur<br />

```js
module.exports = {
   name: <String> or <Array>, // Ex: "menu"
   cmd: <Array>, // Ex: ["cmd","help"]
   desc: <String>, // Ex: "Menu adalah command"
   param: <String>,  // Ex: "<teks>"
   category: <String>, // Ex: "other"
   query: <Boolean>, // Ex: true
   url: <Boolean>, // Ex: true
   isOwner: <Boolean>, // Ex: false
   isAdmin: <Boolean>, // Ex: false
   isBotAdmin: <Boolean>, // Ex: false
   //etc 
}
```

## Contoh Options

Contoh Command : [`./commands/other/botstat.js`](https://github.com/SkylarKaf/elaina-md/blob/master/commands/other/botstat.js)<br />

```js
{
  name: ["status"],
  cmd: ['status', 'ping', 'runtime', 'test', 'p'],
  category: "other",
  desc: "Bot status",
}
```

## Sorotan

-   [x] Simple Penggunaan
-   [x] Mudah digunakan
-   [x] Mudah untuk dirawat/diperbaiki
-   [x] Support jadibot
-   [x] Ringan
-   [x] Anti delay
-   [x] Anti Pasaran!

# Baca Ini!
- Sc ini hasil recode dari: [Kanaeru](https://github.com/Zynfinity/Kanaeru-Bot)
- Ganti Owner: [Config](https://github.com/SkylarKaf/elaina-md/blob/master/config.js)
- Library: [AmirulDev Baileys](https://www.npmjs.com/package/baileys)
- Session: MultiFileAuthState
- Support: Ubuntu, Windows, Termux & Panel
- Jika stc error: install webp

## Untuk yang Run Panel!!
- Pastikan panel tersebut Support webpmux! 
- Jika tidak paham chat owner untuk bertanya
- [`Owner Here`](https://wa.me/6282331660134?text=Bang) 

## Instalasi

### Dibutuhkan

1.  [Nodejs](https://nodejs.org/en/download) 17/18/19x
2.  [FFmpeg](https://ffmpeg.org)
3.  [libWebP](https://developers.google.com/speed/webp/download)

### Instalasi On Termux

```bash
> pkg install
> pkg upgrade
> pkg install git
> pkg install yarn
> pkg install ffmpeg && pkg install libwebp
> pkg install nodejs
> git clone https://github.com/SkylarKaf/elaina-md
> cd elaina-md
> yarn install
> npm start
# Scan QR
```

### Install Ffmpeg

```bash
- Untuk pengguna Windows, kamu bisa lihat tutorial disini [WikiHow](https://www.wikihow.com/Install-Ffmpeg-on-Windows)<br />
- Untuk pengguna Linux, kamu bisa pakai manager paket kamu sendiri. Contohnya;

# apt (Ubuntu)
apt install ffmpeg -y

# pacman (Arch Linux)
pacman -S ffmpeg
```

### Install libWebP

- Untuk pengguna Windows,

1.  Unduh libWebP untuk Windows dari [sini](https://developers.google.com/speed/webp/download)
2.  Ekstrak ke C:\
3.  Ganti nama folder yang diekstrak ke `libwebp`
4.  Buka PowerShell dan jalankan perintah berikut;

```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```

> Bila sukses terinstal dengan baik, silahkan check dengan perintah berikut di Command Prompt

```cmd
webpmux -version
```

- Untuk pengguna Linux, kamu bisa pakai manager paket kamu. Contohnya;

```bash
# apt (Ubuntu)
apt install libwebp-dev -y

# pacman (Arch Linux)
pacman -S libwebp
```

### Clone Repo

```bash
# clone repo
git clone --depth=1 https://github.com/SkylarKaf/elaina-md

# ubah posisi direktori kamu
cd elaina-md

# install semua module
npm install
# atau
yarn install
# start and scan
npm start
```

# Test bot
[<img src="https://img.shields.io/badge/whatsapp-%808080.svg?&style=for-the-badge&logo=whatsapp&logoColor=white">](https://wa.me/6283863318555?text=.menu)

# Thanks To

-    [`RzkyFdlh`](https://github.com/Rizky878)
-    [`Zynfinity`](https://github.com/Zynfinity)
-    [`AmirulDev20`](https://github.com/amiruldev20)
-    [`SkylarKaf`](https://github.com/SkylarKaf)
-    [`Ferdiz`](https://github.com/FERDIZ-afk)
-    [`xzeraaID`](https://github.com/xzeera-id)
-    [`Alya`](https://github.com/alya-tok)
-    [`Lui`](https://github.com/luiii24)




const axios = require('axios')
const cheerio = require('cheerio')
const author = '@skylarkaf'	
class neonime{
	static search = async(query, page = 1) => {
		return new Promise(async(resolve) => {
			try{
				const {data} = await axios.get(`https://neonime.cloud/page/${page}/?s=${query}`)
				const $ = cheerio.load(data)
				const result = []
				$('#contenedor').find('div.item_1.items > div').each(function(){
					result.push({
						title: $(this).find('a > div > span').text(),
						episode: $(this).find('div.fixyear > h2').text(),
						url: $(this).find('a').attr('href')
					})
				})
				const filter = result.filter(p => p.title && p.episode.includes('Episode'))
				resolve(filter != '' ? {
					status: true,
					author,
					query,
					page,
					result: filter
				} : {
					status: false,
					author,
					query,
					page,
					message: 'not found'
				})
			}catch(e){
				resolve({
					status: 404,
					query,
					page,
					message: 'Page not found!'
				})
			}
		})
	}
	static ongoing = async(page = 1) => {
		return new Promise((resolve) => {
			if(!page) page = 1,
			axios.get(`https://neonime.cloud/episode/page/${page}/`).then(({data}) => {
				const $ = cheerio.load(data)
				const result = []
				$('#episodes > table > tbody > tr').each(function(){
					let episode = $(this).find('td.bb > a > span').text().trim()
					result.push({
						title: $(this).find('td.bb > a').text().split(episode)[0].trim(),
						episode,
						upload_date: $(this).find('td.dd').text(),
						url: $(this).find('td.bb > a').attr('href')
					})
				})
				resolve(result != '' ? {
					status: true,
					author,
					page,
					result: result
				} : {
					status: false
				})
			}).catch(e => resolve({status: false, message: 'unknown error'}))
		})
	}
	static getData = async(url) => {
		return new Promise(async(resolve) => {
			const {data} = await axios.get(url)
			const $ = cheerio.load(data)
			const result = {}
			$('#info > div').each(function(){
				let param = $(this).find('b').text().replace(/ /g, '_').toLowerCase()
				if(param) result[param] = $(this).find('span').text()
			})
			result.download = {}
			$('#series > div.ladoB > div.central > div > ul > ul').each(function(){
				$(this).find('li').each(function(a, b){
					$(b).find('a').each(function(){
						let name = $(b).find('label').text().replace(/ /g, '_').toLowerCase().trim()
						if(Object.keys(result.download).length <= 10) result.download[name] ? result.download[name] : result.download[name] = {name: $(b).find('label').text()}
						result.download[name][$(this).text().toLowerCase().trim()] = $(this).attr('href')
					})
				})
			})
			resolve(result)
		})
	}
 }
class anoboy {
static ongoing = async (page = 1) => {
    return new Promise(async (resolve, reject) => {
    if(!page) page = 1
      const { data } = await axios.get(`https://anoboy.ninja/page/${page}/`)
      const $ = cheerio.load(data)
      const result = []
     $('body > div.wrap > div.container > div.home_index > a').each(function() {
       result.push({
         title: $(this).find('h3').text(),
         time: $(this).find('div.jamup').text(),
         url: $(this).attr('href')
         })
       })
      resolve(result != '' ? {
        status: true,
        author,
        page,
        result: result
        } : {
        status: false,
        message: 'error'
      })
   })
}
static search = async (query, page = 1) => {
    return new Promise(async (resolve, reject) => {
    try {
    if(!page) page = 1
      const {data} = await axios.get(`https://anoboy.ninja/page/${page}/?s=${query}`)       
      const $ = cheerio.load(data);
      const format = [];
      const link = [];
      const judul = [];
      const thumb = [];
      const uptime = [];
      const result = [];
     $("body > div.wrap > div.container > div.column-content > a").each(function() {
       result.push({
         title: $(this).find("div > div.amvj > h3").text(),
         uptime: $(this).find("div > div.jamup").text(),
         thumbnail: $(this).find("div > amp-img").attr("src"),
         link: $(this).attr("href"),
         })
        }
       )
      resolve(result != '' ? {
      status: true,
      author,
      page,
      query,
      result: result,
      } : {
      status: false,
      message: 'error'
      })
       }catch(e){
	    resolve({
		status: 404,
		query,
		page,
		message: 'Page not found!'
	   })
     }
  })           
}
static getData = async(url) => {
    return new Promise((resolve, reject) => {
      const hasil = []
      axios.get(url).then((res) => {
	  const $ = cheerio.load(res.data)
	  hasil.play = $('#colomb > p > span:nth-child(3) > a:nth-child(2)').attr('href')
      hasil.title = $('body > div.wrap > div.container > div.pagetitle > h1').text()
      resolve(hasil)
	  })
   })
 }
}
module.exports = { 
      anoboy, 
      neonime 
}
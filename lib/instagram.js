const axios = require('axios')
const request = require('request')
const igd = require('instagram-url-direct')
const igstalk = async (user) => {
  	try {
  		const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, {
  			headers: {
				"cookie": 'sessionid=54783047583%3Ai4JciXYggGKxDb%3A17%3AAYfjd_uYP5UXrpXdXRbG0EJ-0acF4r7lMEZNaCXIcQ',
  				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
  				"x-asbd-id": "198387",
  				"x-csrftoken": "VXLPx1sgRb8OCHg9c2NKXbfDndz913Yp",
  				"x-ig-app-id": "936619743392459",
  				"x-ig-www-claim": "0"
  			}
  		})
  		return(data.status == 'ok' ? {
        			status: true,
        			profile: {
    			      low: data.data.user.profile_pic_url,
    			      high: data.data.user.profile_pic_url_hd,
              },
              data: {
    			      url: data.data.user.external_url,
    				    id: data.data.user.id,
    			      fullname: data.data.user.full_name,
    			      private: data.data.user.is_private,
    			      verified: data.data.user.is_verified,
    			      bio: data.data.user.biography,
    			      follower: data.data.user.edge_followed_by.count,
    			      following: data.data.user.edge_follow.count,
    			      conneted_fb: data.data.user.connected_fb_page,
    			      videotimeline: data.data.user.edge_felix_video_timeline.count,
    			      timeline: data.data.user.edge_owner_to_timeline_media.count,
    			      savedmedia: data.data.user.edge_saved_media.count,
    			      collections: data.data.user.edge_media_collections.count,
              }
      } : {status: false, message: 'user not found'})
  	} catch {
  		return ({
  			status: false,
  			message: 'user not found'
  		})
  	}
  }
class instagram{
  static igstalk = async(user) => igstalk(user)
  static igstory = async (user) => {
  	try {
  		const userdata = await igstalk(user)
  		if (!userdata.status) return ({
  			status: false,
  			message: 'user not found'
  		})
  		const {
  			data
  		} = await axios.get(`https://i.instagram.com/api/v1/feed/user/${userdata.data.id}/story/`, {
  			headers: {
  				"cookie": 'sessionid=54783047583%3Ai4JciXYggGKxDb%3A17%3AAYfjd_uYP5UXrpXdXRbG0EJ-0acF4r7lMEZNaCXIcQ',
  				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
  				"x-asbd-id": "198387",
  				"x-csrftoken": "vJyxo3C9tfh4z8iz2TfcgLTgulUzZXH4",
  				"x-ig-app-id": "936619743392459",
  				"x-ig-www-claim": "hmac.AR2FJkaomBTRzBeE8IgIprjawqKtAkzHlrs_RzUvMkxQ9q1h"
  			}
  		})
  		const url = []
  		for (let i of data.reel.items) {
  			if (i.video_duration == 5 || i.video_duration == undefined) url.push({
  				type: 'image',
  				url: i.image_versions2.candidates[0].url
  			})
  			else url.push({
  				type: 'video',
  				url: i.video_versions[0].url
  			})
  		}
  		const result = {
  			status: true,
  			user: data.reel.user,
  			story: url
  		}
  		return result
  	} catch (e) {
  		console.log(e)
  		return ({
  			status: false,
  			message: 'user not found'
  		})
  	}
  }
static instagramdl = async(url) => {
  try{
    const {data} = await axios.get(`https://instadownloader.co/instagram_post_data.php?url=${url}`)
    const json = JSON.parse(data)
    if(json.images_links == '' && json.videos_links == '') return({status: false, message: 'media not found'})
    return({
      status: true,
      json
    })
  }catch{
    return({status: false, message: 'error'})
  }
}
static instagramdl2 = async(url) => {
  return new Promise(async(resolve) => {
    try{
      const {data} = await axios.get(`https://igpanda.com/getAjax?type=video&url=${url}`)
      const $ = cheerio.load(data.html)
      const result = []
      $('div.row.justify-content-center > div').each(function(){
        result.push($(this).find('div > div > a').attr('href'))
      })
      resolve(result != '' ? {status: true, result: result} : {status: false})
    }catch{
      resolve({status: false})
    }
  })
}
static instagramdl3 = async(ch) => {
  return new Promise(async(resolve) => {
    const options = {
      method: 'POST',
      url: 'https://igdownloader.com/ajax',
      headers: {
        "cookie": 'PHPSESSID=qqav7k9pth1b10m386mta3v95h;',
        "X-Requested-With": 'XMLHttpRequest'
      },
      formData: {
        link: ch,
        downloader: 'photo'
      }
    }
    request(options, async function(error, response, body){
      if(error) return resolve({status: false, message: 'error not found'})
      const json = JSON.parse(body)
      if(json.error) return resolve({status: false, message: 'error not found'})
      const $ = cheerio.load(json.html)
      const result = []
      $('div > div.img-block').each(function(){
        result.push($(this).find('div > div > a').attr('href'))
      })
      resolve(result != '' ? {status: true, result: result} : {status: false, message: 'error not found'})
    })
  })
}
	static instagramdl4 = async(url) => {
		const data = await igd(url)
		data.media = []
		if(data.results_number != 0){
			for(let i of data.url_list){
				data.media.push({
					type: i.includes('.jpg') || i.includes('.webp') ? 'image' : i.includes('.mp4') ? 'video' : '',
					url: i
				})
			}
			delete data.url_list
		}
		return(data.results_number == 0 ? {
			status: false,
			message: 'media not found!'
		} : {
			status: true,
			...data
		})
	}
}
module.exports = instagram

// Api.js

require("dotenv").config({path: "../.env"})
const axios = require("axios")

class API {
	constructor(config = {}) {

		const user = config.user
		const token = config.token
		const appName = config.appName
		axios.defaults.baseURL = "https://api.pushover.net/1/"


		axios.interceptors.request.use(request => {
			if (!request.data) request.data = {}
			request.data.token = token
			request.data.user = user
			return request
		}, error => {
			return Promise.reject(error)
		})


		/** send notification */
		this.send = async function(message, options = {}) {

			// options.title = appName
			if (options.title) options.title = `${appName} - ${options.title}`
			else options.title = appName
			let data = {
				message,
				...options
			}

			console.log(data)

			return await axios.post("/messages.json", data).catch(err => {
				throw new Error(err)
			})
		}

		this.log = async function(message, options = {}) {
			return await this.send(message, options)
		}

		this.info = async function(message, options = {}) {
			options.title = "INFO"
			return await this.send(message, options)
		}

		this.warn = async function(message, options = {}) {
			options.title = "WARN"
			return await this.send(message, options)
		}

		this.error = async function(message, options = {}) {
			options.title = "ERROR"
			return await this.send(message, options)
		}

		let obj = this.send
		for (let [key, val] of Object.entries(this)) obj[key] = val

		return obj

	}
}









const a = new API({
	user: process.env.PUSHOVER_USER,
	token: process.env.PUSHOVER_TOKEN,
	appName: "zooper"
})

console.log(a)


a.error("booper", {

title: "asdfhjkl"
})
// Notify.js

const Logger = require("@ryanforever/logger").v2
const ERROR = require("./Error.js")
const Message = require("./Message.js")
const axios = require("axios")


function Notify(config = {}) {

	const user = config.user
	const token = config.token

	if (!user) throw new ERROR("MISSING_USER")
	if (!token) throw new ERROR("MISSING_TOKEN")
	const logger = new Logger("notify", {debug: config.debug ?? false})

	this.appName = config.appName
	
	let _this = this

	axios.defaults.baseURL = "https://api.pushover.net/1/messages.json"
	axios.defaults.params = {token, user}


	this.send = async function(message, config = {}) {
		logger.debug("sending notification...")
		let msg = new Message(message, config)
		msg.title = makeTitle(config.title)
		return await send(msg)

	}

	this.error = async function(message, config = {}) {
		logger.debug("sending error notification...")
		let msg = new Message(message, config)
		msg.title = makeTitle(`ERROR 🆘`, config.title)
		return await send(msg)
	}

	this.warn = async function(message, config = {}) {
		logger.debug("sending warning notification...")
		let msg = new Message(message, config)
		msg.title = makeTitle("WARN ⚠️", config.title)
		return await send(msg)
	}


	this.test = async function() {
		logger.debug("sending test notification...")
		let msg = new Message("Hello! This is a test.", {
			title: "Test Notification",
			url: "https://example.com",
			url_title: "Example URL",
			title: "Test Notification",
			// html: false,
			// file: "../images/earth.jpg",
			priority: 5
		})
		// msg.title = makeTitle(title)
		return await send(msg)
	}

	function makeTitle(title, title2) {
		if (title2) title = `${title} - ${title2}`
		let output
		if (_this.appName && title) output = `${_this.appName} - ${title}`
		else if (!_this.appName && title) output = title
		else if (_this.appName && !title) output = _this.appName
		else if (!_this.appName && !title) output = undefined
		return output
	}


	// main send using api
	async function send(data) {
		try {
			let res = await axios({
				method: "POST",
				params: {...data}
			})
			return res.data
		} catch(err) {
			logger.error(err?.response?.data)
		}

	}

	const output = this.send
	output.appName = this.appName
	output.send = this.send
	output.error = this.error
	output.warn = this.warn
	output.test = this.test

	return output
}




module.exports = Notify






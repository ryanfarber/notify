// src.js

const Logger = require("@ryanforever/logger").v2
const logger = new Logger("notify", {debug: true})
const Pushover = require("pushover-notifications")
// const {Message} = require("./schemas.js")
const ERROR = require("./errors.js")
const {bold, italic, underline, color, has} = require("./helpers.js")

function Notify(config = {}) {

	const user = config.user
	const token = config.token

	if (!user) throw new ERROR("MISSING_USER")
	if (!token) throw new ERROR("MISSING_TOKEN")
	const push = new Pushover({user, token})	
	this.appName = config.appName
	
	let _this = this
	
	// this.appName = (name) => appName = name

	
	this.quick = async function(message, config = {}) {
		logger.debug("sending notification...")
		let msg = new Message(config)
		msg.message = message
		msg.title = makeTitle(config.title)
		return await push.send(msg)
	}

	this.send = async function(message, config = {}) {
		logger.debug("sending notification...")
		let msg = new Message(config)
		msg.message = message
		msg.title = makeTitle(config.title)
		return await push.send(msg)
	}

	this.error = async function(message, config = {}) {
		logger.debug("sending error notification...")
		let msg = new Message(config)
		msg.message = message
		msg.title = makeTitle("ERROR 🆘")
		return await push.send(msg)
	}

	this.warn = async function(message, config = {}) {
		logger.debug("sending warning notification...")
		let msg = new Message(config)
		msg.message = message
		msg.title = makeTitle("WARN ⚠️")
		return await push.send(msg)
	}


	this.test = async function() {
		let appName = this.appName
		logger.debug("sending test notification...")
		let title = "Test Notification"
		let message = "Hello! This is a test."
		let msg = new Message({
			url: "https://example.com",
			url_title: "Example URL",
			title: "Test Notification",
			// html: false,
			// file: "../images/earth.jpg",
			priority: 5
		})
		msg.message = message
		// msg.title = makeTitle(title)
		return await push.send(msg)
	}



	
	function makeTitle(title) {

		let output
		if (_this.appName && title) output = `${_this.appName} - ${title}`
		else if (!_this.appName && title) output = title
		else if (_this.appName && !title) output = _this.appName
		else if (!_this.appName && !title) output = undefined
		return output
	}


	function Message(d = {}) {
		let priorityTypes = [-2, -1, 0, 1, 2]
		let title
		if (_this.appName && d.title) title = `${_this.appName} - ${d.title}`
		else if (!_this.appName && d.title) title = d.title
		else if (_this.appName && !d.title) title = _this.appName
		this.title = title
		this.message = d.message
		this.url = d.url
		this.url_title = d.url_title
		this.html = (d.html == true) ? 1 : undefined
		this.sound = d.sound || undefined
		this.priority = undefined
		this.file = d.file

		if (has(d.priority, priorityTypes)) this.priority = d.priority
		else logger.warn(`priority must be one of [${priorityTypes.join(", ")}]`)
	}


	const output = this.quick
	output.appName = this.appName
	output.send = this.send
	output.error = this.error
	output.warn = this.warn
	output.test = this.test

	return output
	// return this.all
}


module.exports = Notify






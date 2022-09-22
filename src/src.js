// src.js

const Logger = require("@ryanforever/logger").v2
const logger = new Logger("notify", {debug: true})
const Pushover = require("pushover-notifications")
const EventEmitter = require("events")
const {inherits} = require("util")
const {Message} = require("./schemas.js")
const ERROR = require("./errors.js")
const {bold, italic, underline, color, has} = require("./helpers.js")

function Notify(config = {}) {

	const user = config.user
	const token = config.token
	const appName = config.appName
	if (!user) throw new ERROR("MISSING_USER")
	if (!token) throw new ERROR("MISSING_TOKEN")
	const push = new Pushover({user, token})
	
	
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
		logger.debug("sending test notification...")
		let msg = new Message({
			title: "Test Notification",
			message: "Hello! This is a test.",
			url: "https://example.com",
			url_title: "Example URL",
			// html: false,
			// file: "../images/earth.jpg",
			priority: 5
		})
		if (appName) msg.title = `[${appName}] ${msg.title}`
		return await push.send(msg)
	}


	
	function makeTitle(title) {
		let output
		if (appName && title) output = `${appName} - ${title}`
		else if (!appName && title) output = title
		else if (appName && !title) output = appName
		else if (!appName && !title) output = undefined
		return output
	}

	const output = this.quick
	output.send = this.send
	output.error = this.error
	output.warn = this.warn
	output.test = this.test
	return output
	EventEmitter.call(this)
	return this.all
}
inherits(Notify, EventEmitter)



module.exports = Notify






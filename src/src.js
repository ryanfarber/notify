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


	this.send = async function(config = {}) {
		logger.debug("sending notification...")
		let msg = new Message(config)
		if (appName) msg.title = `[${appName}] ${msg.title}`
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

	EventEmitter.call(this)
}
inherits(Notify, EventEmitter)



module.exports = Notify






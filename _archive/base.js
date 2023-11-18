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

	
	this.send = async function(message, config = {}) {
		logger.debug("sending notification...")
		let msg = new Message(config)
		msg.message = message
		return await push.send(msg)
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




	return this.send
	// return this.all
}


module.exports = Notify






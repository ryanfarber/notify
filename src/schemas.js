// schemas.js

const Logger = require("@ryanforever/logger").v2
const logger = new Logger("notify", {debug: false})
const {has} = require("./helpers.js")

// message schema
function Message(d = {}) {
	let priorityTypes = [-2, -1, 0, 1, 2]
	this.title = d.title
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





module.exports = {
	Message
}
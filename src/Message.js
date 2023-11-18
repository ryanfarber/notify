// Message.js

const Logger = require("@ryanforever/logger").v2
const logger = new Logger("notify", {debug: false})

const priorityTypes =  [-2, -1, 0, 1, 2]


class Message {
	constructor(message, config = {}) {
		this.message = message || "<blank message>"
		this.title = config.title
		this.url = config.url
		this.url_title = config.urlTitle || config.url_title
		this.html = (config.html) ? 1 : undefined
		this.sound = config.sound || undefined
		this.priority = undefined
		this.file = config.file
		this.ttl = config.ttl

		if (config.priority) {
			if (priorityTypes.includes(config.priority)) this.priority = config.priority
			else logger.warn(`priority must be one of [${priorityTypes.join(", ")}] got "${config.priority}"`)
		}
	}
}

module.exports = Message
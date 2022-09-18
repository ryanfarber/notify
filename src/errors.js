// errors.js


let type = {
	MISSING_USER: "please enter your Pushover user key.\nit can be found @ https://pushover.net",
	MISSING_TOKEN: "please enter your Pushover application token.\nit can be found under 'Your Applications' @ https://pushover.net",
	INVALID_PRIORITY: "check priority"
}



module.exports = class ERROR extends Error {
	constructor(input, x) {
		super()
		this.name = "NOTIFY ERROR"
		if (type.hasOwnProperty(input)) {
			this.message = type[input]
			this.code = input
		} else {
			this.message = input
		}
	}
}



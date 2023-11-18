// test.js


require("dotenv").config()

const Notify = require("./src/Notify.js")
const notify = new Notify({
	user: process.env.PUSHOVER_USER,
	token: process.env.PUSHOVER_TOKEN,
	appName: "notify dev",
	// debug: true
})

// notify.test().then(console.log)

// notify("hello")

// notify.appName = "booper"
// let n = notify.instance("booper")
// console.log(notify)
// notify.warn("hello there", {title: undefined}).then(console.log)
// notify.error("something went wrong")
// notify.warn("booper")

notify("huh? yo", {ttl: 5}).then(console.log)

// notify.test()
// test.js


require("dotenv").config()

const Notify = require("./src")
const notify = new Notify({
	user: process.env.PUSHOVER_USER,
	token: process.env.PUSHOVER_TOKEN,
	appName: "test"
})

// notify.test().then(console.log)

// notify("hello")

notify.appName = "booper"
// let n = notify.instance("booper")
console.log(notify)
notify.test()
// notify.error("something went wrong")
// notify.warn("booper")

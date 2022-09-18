// test.js


require("dotenv").config({path: "../.env"})

const Notify = require("./src.js")
const notify = new Notify({
	user: process.env.PUSHOVER_USER,
	token: process.env.PUSHOVER_TOKEN,
	appName: "test app"
})

notify.test().then(console.log)

// test.js


require("dotenv").config({path: "../.env"})

const Notify = require("./src.js")
const notify = new Notify({
	user: process.env.PUSHOVER_USER,
	token: process.env.PUSHOVER_TOKEN,
	appName: "botlab"
})

// notify.test().then(console.log)

// notify("hello")


// notify.test()
// notify.error("something went wrong")
notify.warn("booper")

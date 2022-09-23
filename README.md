# notify
this is essentially a wrapper for [Pushover](https://www.npmjs.com/package/pushover-notifications), which lets you easily send push notifications to your devices.

There are a few added functionality


# usage
```javascript

const Notify = require("@ryanforever/notify")
const notify = new Notify({
    user: process.env.PUSHOVER_USER,
    token: process.env.PUSHOVER_TOKEN,
    appName: "test" // optional name to prefix the notification title
})


notify.test() // will send a test notification to all your devices

notify("hello world") // send a simple notification
notify.error("something went wrong") // send an error notification
notify.warn("uh oh!")  // send a warning notification
```


![notification]("https://github.com/ryanfarber/notify/blob/8e87e75d23c535740b3dee38713dcb74af9346df/images/screenshot.png")

## additional config
```javascript
// send with optional config
notify("this is an alert", {
    url: "https://example.com",
    url_title: "website",
    html: false,
    sound: "bell.wav",
    priority: -1,
    file: "./image.png"
})
```
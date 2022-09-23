# notify
easily send push notifications to your devices. uses [Pushover](https://www.npmjs.com/package/pushover-notifications)


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

![]("/images/screenshot.png")
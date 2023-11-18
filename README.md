# notify
this is a wrapper for the [Pushover](https://pushover.net) API, which lets you easily send push notifications to your devices.

There are a few added functionalities.

## usage
```javascript
const Notify = require("@ryanforever/notify")
const notify = new Notify({
    user: process.env.PUSHOVER_USER,
    token: process.env.PUSHOVER_TOKEN,
    appName: "test" // optional name to prefix the notification title
})

notify("hello world")
```

![notification](https://github.com/ryanfarber/notify/blob/8e87e75d23c535740b3dee38713dcb74af9346df/images/screenshot.png?raw=true)

## other methods
```javascript

notify("sends a message")
notify.send("sends a message")

notify.error("something went wrong") // send an error notification
notify.warn("uh oh!")  // send a warning notification
```

## options

| key | description |
| --- | ----------- |
| title | optional title for the notification |
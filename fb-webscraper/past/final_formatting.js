const data = require("./data.json");
const fs = require("fs");
// reformato to objects where the event_url is the key
const events = data.reduce((acc, event) => {
    if (event.img_url) {
        acc[event.event_link] = {
            event_date: event.event_date,
            event_name: event.event_name,
            img_url: event.img_url,
        };
    } else {
        acc[event.event_link] = {
            event_date: event.event_date,
            event_name: event.event_name,
        };
    }
  return acc;
}, {});

fs.writeFileSync("events.json", JSON.stringify(events));
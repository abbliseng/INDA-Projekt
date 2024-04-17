const data = require("../true_events.json");

const fs = require("fs");

for (const [key, value] of Object.entries(data)) {
    const new_event = {
        "event_id": {
            "S": key
        },
        "event_date": {
            "S": value.event_date
        },
        "event_name": {
            "S": value.event_name
        },
        "img": {
            "BOOL": value.img
        }
    }
    data[key] = new_event;
}

fs.writeFileSync("./BB.json", JSON.stringify(data));
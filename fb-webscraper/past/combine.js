const date_data = require("../events.json");
const other = require("../true_events.json");

const fs = require("fs");

// For each object in date_data, add the event_name and img from other
for (const [key, value] of Object.entries(date_data)) {
    date_data[key].event_name = other[key].event_name;
    date_data[key].img = other[key].img;
}

fs.writeFileSync("complete.json", JSON.stringify(date_data));
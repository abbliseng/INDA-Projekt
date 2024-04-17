// Load
const data = require("./data4.json");
const fs = require("fs");

// reformato to objects where the id is the key and event_date format from WED, 6 MAR 2019 to 2019-03-06
const events = data.reduce((acc, event) => {
    let event_date = event.event_date.split(" ");
    let month = 0;
    console.log("a"+event_date[2]+"a");
    if (event_date[2] === "JAN") {
        month = "01";
    } else if (event_date[2] === "FEB") {
        month = "02";
    } else if (event_date[2] === "MAR") {
        month = "03";
    } else if (event_date[2] === "APR") {
        month = "04";
    } else if (event_date[2] === "MAY") {
        month = "05";
    } else if (event_date[2] === "JUN") {
        month = "06";
    } else if (event_date[2] === "JUL") {
        month = "07";
    } else if (event_date[2] === "AUG") {
        month = "08";
    } else if (event_date[2] === "SEP") {
        month = "09";
    } else if (event_date[2] === "OCT") {
        month = "10";
    } else if (event_date[2] === "NOV") {
        month = "11";
    } else if (event_date[2] === "DEC") {
        month = "12";
    }


    console.log(month);

    if (event.img_url) {
        acc[event.id] = {
            event_date: `${event_date[3]}-${month}-${event_date[1]}`,
            event_name: event.event_name,
        };
    } else {
        acc[event.id] = {
            event_date: `${event_date[3]}-${month}-${event_date[1]}`,
            event_name: event.event_name,
        };
    }
    return acc;
}, {});

fs.writeFileSync("events.json", JSON.stringify(events));
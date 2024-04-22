// Make put request to dynamoDB through http request

const data = require("../complete.json");
const url = "https://fk63b9q0l6.execute-api.eu-west-2.amazonaws.com/events"

const fs = require("fs");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
for (const [key, value] of Object.entries(data)) {
    const new_event = {
        "id": key,
        "event_date": value.event_date,
        "event_name": value.event_name,
        "img": value.img
    }
    data[key] = new_event;
    let got_it = true;

    // Make put request to dynamoDB through http request
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(new_event),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                console.log(data.message);
                got_it = false;
            } else {
                // Remove the event from the file
                delete data[key];
                fs.writeFileSync("../true_events.json", JSON.stringify(data));
                console.log("Success");
            }
        })
        .catch((err) => {console.log(err)
        console.log(new_event)});

    await sleep(300);
}
}

main();



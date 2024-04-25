
// NOTE: Init AWS
var AWS = require("aws-sdk");
var uuid = require("uuid");
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'infom'});
// var bucketName = "dkmstorage/event_images";
var bucketName = "dkmstorage";
AWS.config.credentials = credentials;

// Set region
AWS.config.update({ region: "eu-west-2" });
// Start s3
var s3 = new AWS.S3();
// Start dynamodb
const docClient = new AWS.DynamoDB.DocumentClient();

async function UploadImage(event) {
    const res = await fetch(event.img_url);
    const img_blob = await res.buffer();

    const uploadedImage = await s3.upload({
        Bucket: bucketName,
        Key: "event_images/" + event.id + ".jpg",
        Body: img_blob,
        ContentType: "image/jpeg",
    }).promise();

    console.log("Uploaded image: ", uploadedImage.Location);
    return;
}

async function PutItem(event) {
    const params = {
        TableName: "events",
        Item: event,
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add event", event.id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", event.id);
        }
    });
}

// NOTE: Init Puppeteer
const puppeteer = require("puppeteer");

async function Login(page) {
    await page.waitForSelector(
        "#m_login_email"
    );
    await page.type("#m_login_email", n);
    await page.type("#password_input_with_placeholder > input", b);
    await page.click("#login_form > ul > li:nth-child(3) > input");

    return;
}

async function FetchImages(browser, data) {
    data.map(async (event) => {
        const url = "https://mbasic.facebook.com/events/" + event.id;
        const new_page = await browser.newPage();
        await new_page.goto(url);
        const img = await new_page.evaluate(() => {
            const img = document.querySelector("#event_header > a > img");
            return img ? img.getAttribute("src") : false;
        });
        if (!img) {
            return event;
        }
        event.img_url = img;
        event.img = true;
        new_page.close();
        return event;
    });
    // Wait for all images to be fetched
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            if (data.filter((event) => !event.img).length == 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
    return data;
}

async function Scrape(page) {
    await page.waitForSelector(
        "#structured_composer_async_container > section"
    );
    const data = await page.evaluate(() => {
        const tds = Array.from(
            document.querySelectorAll("#structured_composer_async_container > section")
        );
        return tds.map((td) => {
            // For all children of the td, get the text
            const children = Array.from(td.children);
            return children.map((child) => {
                // Parse event id
                let event_info = child.querySelector("div._5rgo._27x0 > div");
                const event_id = event_info.querySelector("a").getAttribute("href").split("/")[2].split("?")[0];
                console.log(event_id);

                event_info = event_info.querySelector("a > table > tbody > tr")
                const event_name = event_info.querySelector("td._4g34 > h3").innerText;
                console.log(event_info);

                let event_date = event_info.querySelector("td._5s61 > div").innerText.replace("\n", " ");

                if (event_date.split(" ").length == 2) {
                    event_date += " " + new Date().getFullYear();
                }
                const months = {
                    "JAN": "01",
                    "FEB": "02",
                    "MAR": "03",
                    "APR": "04",
                    "MAY": "05",
                    "JUN": "06",
                    "JUL": "07",
                    "AUG": "08",
                    "SEP": "09",
                    "OCT": "10",
                    "NOV": "11",
                    "DEC": "12",
                };
                event_date = event_date.split(" ");
                event_date = event_date[2] + "-" + months[event_date[1]] + "-" + event_date[0];

                const event = {
                    id: event_id,
                    event_name: event_name,
                    event_date: event_date,
                    img: false,
                };

                return event;
            });
        });
    });

    return data[0];
}

async function Main() {
    // Get the stored events
    const fetch_url = "https://fk63b9q0l6.execute-api.eu-west-2.amazonaws.com/events"
    const fetch_data = await fetch(fetch_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "mode": "no-cors",
        },
    }).then((res) => res.json());

    // Fetch the data
    const url = "https://mbasic.facebook.com/datasklubbmasteri?v=timeline";
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Handle decline cookies
    await page.waitForSelector(
        "div > button.br"
    );
    await page.click("div > button.br");

    await Login(page);
    
    await page.waitForSelector(
        "#structured_composer_async_container > section"
    );

    const data = await Scrape(page);
    // If the event_id is already in the database, skip
    filtered_data = data.filter((event) => {
        return !fetch_data.find((db_event) => db_event[0].id == event.id);
    });

    const data_with_img = await FetchImages(browser, filtered_data);
    
    // NOTE: Post the data to dynamoDB and the images to S3 bucket
    // Upload the images to S3
    data_with_img.map((event) => {
        if (event.img) {
            console.log("Uploading image for event: ", event.id);
            UploadImage(event);
            PutItem(event);
        }
    });
    
    // console.log(data_with_img);

    page.close();
    browser.close();
    return data_with_img;

}

Main();
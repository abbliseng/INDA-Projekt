const puppeteer = require("puppeteer");

async function ScrapeEvents() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/datasklubbmasteri/upcoming_hosted_events');

    let selector =
        "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)";
    let exists = await page.$eval(selector, () => true).catch(() => false);
    if (exists) {
        //   If the selector is found, click it
        await page.click(
            "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)"
        );
    }
    selector =
        "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div";
    exits = await page.$eval(selector, () => true).catch(() => false);
    if (exists) {
        await page.click(
            "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div"
        );
    }

    await page.waitForSelector(
        "div > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div > div > div > div > div > div > div > div > div.x78zum5.x1q0g3np.x1a02dak.x1qughib"
    );
    // Scroll down as much as possible
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
    // For each div in the above selector, get the text
    const data = await page.evaluate(() => {
        const tds = Array.from(
            document.querySelectorAll("div.x6s0dn4.x1lq5wgf.xgqcy7u")
        );
        console.log(tds.length);
        return tds.map((td) => {
            // Select add that also are a child of the td
            const spans = Array.from(td.querySelectorAll("span.x1lliihq.x6ikm8r"));
            const hrefs = Array.from(td.querySelectorAll("a.x1i10hfl.xjbqb8w"));

            if (spans.length < 2) {
                return null;
            }

            const event_data = {
                event_date: spans[0].innerText,
                event_name: spans[1].innerText,
                event_link: hrefs[0].href,
            };
            // Get the text from each span
            return event_data;
        });
    });
    // Get the img for each event
    const data_with_img = await GetImages(data, page);

    await browser.close();

    // Reformato to objects where the event_url is the key
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

    return events;
}

async function GetImages(data, page) {
    for (let i = 0; i < data.length; i++) {
        // console.log("Getting img for event", i + 1, "of", data.length)
        const event = data[i];
        // If the event already has an img_url, continue to next iteration
        if (event.img_url) {
            continue;
        }
        await page.goto(event.event_link);

        let selector = "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)";
        let exists = await page.$eval(selector, () => true).catch(() => false)
        if (exists) {
            //   If the selector is found, click it
            await page.click(
                "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)"
            );
        }
        selector = "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div";
        exits = await page.$eval(selector, () => true).catch(() => false)
        if (exists) {
            await page.click(
                "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div"
            );
        }
        selector = "img.xz74otr";
        exists = await page.$eval(selector, () => true).catch(() => false)
        if (!exists) {
            console.log("Could not find img for event", i + 1, "of", data.length);
            continue;
        }
        //   Get img
        const img_url = await page.evaluate(() => {
            // Copy the img url
            const imgs = document.querySelectorAll("img.xz74otr.x1ey2m1c.x9f619.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3");
            const img_srcs = Array.from(imgs).map((img) => img.src);
            return img_srcs[1];
        });

        const new_event = {
            ...event,
            img_url,
        };
        data[i] = new_event;
    }
    return data;
}

ScrapeEvents().then((events) => {
    console.log(events);
});
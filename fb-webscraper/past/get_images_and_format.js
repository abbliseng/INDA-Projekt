const puppeteer = require("puppeteer");

const data = require("./data.json");

// console.log(data);
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    // await page.goto(data[0].event_link)
    
    for (let i = 0; i < data.length; i++) {
    // for (let i = 0; i < 3; i++) {
        console.log("Getting img for event", i + 1, "of", data.length)
        const event = data[i];
        // If the event already has an img_url, continue to next iteration
        if (event.img_url) {
            continue;
        }
        await page.goto(event.event_link);

        // If the following selectors are not found, continue to next iteration
        // await page.waitForSelector(
        //     "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)"
        //   );
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

        // console.log(img_url);
        // page.goto(img_url);

        // Create new data object with img_url
        const new_event = {
            ...event,
            img_url,
        };
        // Update the data file
        data[i] = new_event;
        const fs = require("fs");
        fs.writeFileSync("./data.json", JSON.stringify(data));
    }
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
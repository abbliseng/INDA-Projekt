const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // await page.goto('https://www.facebook.com/datasklubbmasteri/upcoming_hosted_events');
  await page.goto(
    "https://www.facebook.com/datasklubbmasteri/past_hosted_events"
  );

  // Find first element with class "_2pie" and click it
  await page.waitForSelector(
    "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)"
  );
  await page.click(
    "body > div.__fb-light-mode.x1n2onr6.x1vjfegm > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1)"
  );
  await page.waitForSelector(
    "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div"
  );
  await page.click(
    "div > div > div:nth-child(1) > div > div:nth-child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div"
  );

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
    // class="x6s0dn4 x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1olyfxc x9f619 x78zum5 x1e56ztr xyamay9 x1pi30zi x1l90r2v x1swvt13 x1gefphp"
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

  // await new Promise(() => {});
  await browser.close();

  // Save data to file
  const fs = require("fs");
  fs.writeFileSync("data1.json", JSON.stringify(data));
})();

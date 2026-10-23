import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3006/";
const MS = Number(process.argv[3] || 18000);
const SHOT = process.argv[4] || "renders/studio-probe.png";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();

const logs = [];
const errors = [];
const pending = new Map();
const done = new Map();
const failures = [];

page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("requestfailed", (r) =>
  failures.push(`${r.failure()?.errorText || "failed"} ${r.url()}`),
);
page.on("request", (r) => pending.set(r.url(), Date.now()));
page.on("requestfinished", (r) => {
  const s = pending.get(r.url());
  pending.delete(r.url());
  done.set(r.url(), s ? Date.now() - s : -1);
});

const t0 = Date.now();
try {
  await page.goto(URL, { waitUntil: "load", timeout: MS });
} catch (e) {
  errors.push(`goto: ${e.message}`);
}
// let it spin for the remaining budget
const leftover = Math.max(0, MS - (Date.now() - t0));
await page.waitForTimeout(leftover);

const bodyText = await page.evaluate(() => {
  const root = document.querySelector("#root");
  return {
    rootEmpty: !root || root.children.length === 0,
    rootHTMLLen: root ? root.innerHTML.length : 0,
    title: document.title,
    timelinesKeys: Object.keys(window.__timelines || {}),
    visibleText: (document.body.innerText || "").slice(0, 400),
  };
});

await page.screenshot({ path: SHOT, fullPage: false });
await browser.close();

console.log("URL:", URL);
console.log("TITLE:", bodyText.title);
console.log("ROOT_EMPTY:", bodyText.rootEmpty, "HTMLlen:", bodyText.rootHTMLLen);
console.log("TIMELINES_KEYS:", JSON.stringify(bodyText.timelinesKeys));
console.log("VISIBLE_TEXT:", bodyText.visibleText.replace(/\s+/g, " ").trim());
console.log("\n== PAGE ERRORS ==");
for (const e of errors) console.log(e);
console.log("\n== REQUEST FAILURES ==");
for (const f of failures) console.log(f);
console.log("\n== STILL-PENDING REQUESTS (after " + MS + "ms) ==");
const now = Date.now();
for (const [url, t] of pending) console.log(`${now - t}ms pending: ${url}`);
console.log("\n== SLOWEST COMPLETED REQUESTS ==");
const slow = [...done.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
for (const [url, ms] of slow) console.log(`${ms}ms: ${url}`);
console.log("\n== CONSOLE (last 40) ==");
for (const l of logs.slice(-40)) console.log(l);
console.log("\nSCREENSHOT:", SHOT);

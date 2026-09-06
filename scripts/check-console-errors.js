import { chromium } from "@playwright/test";

const BASE_URL = process.env.PREVIEW_URL || "http://localhost:4173";
const ROUTES = ["/", "/page/project-memories"];

const errors = [];

async function checkRoute(page, route) {
  const routeErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      routeErrors.push(`[console.error] ${msg.text()}`);
    }
  });

  page.on("pageerror", (error) => {
    routeErrors.push(
      `[pageerror] ${error.message}\n${error.stack?.split("\n").slice(1, 4).join("\n") ?? ""}`,
    );
  });

  const response = await page.goto(`${BASE_URL}${route}`, {
    waitUntil: "load",
    timeout: 60000,
  });

  if (!response || response.status() >= 400) {
    routeErrors.push(
      `[http] failed to load ${route}: ${response?.status() ?? "no response"}`,
    );
  }

  // Give the SPA a moment to mount and render error-prone 3D scenes.
  await page.waitForTimeout(3000);

  if (routeErrors.length > 0) {
    errors.push(
      `Route ${route}:\n${routeErrors.map((e) => `  ${e}`).join("\n")}`,
    );
  }
}

(async () => {
  const browser = await chromium.launch();
  try {
    for (const route of ROUTES) {
      const context = await browser.newContext();
      const page = await context.newPage();
      try {
        await checkRoute(page, route);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  if (errors.length > 0) {
    console.error("Console errors detected:\n\n" + errors.join("\n\n"));
    process.exit(1);
  }

  console.log("No console errors detected on routes: " + ROUTES.join(", "));
})();

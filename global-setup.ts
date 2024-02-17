import { FullConfig, chromium } from "@playwright/test";
import { LoginPage } from "./pageObjects/login-page";

async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL, storageState } = config.projects[0].use;
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ baseURL: baseURL });
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login();
    
    await page.waitForLoadState('domcontentloaded');
    await page.context().storageState({ path: storageState as string });

    await browser.close();
  }
  
export default globalSetup;
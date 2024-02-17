import { Locator, Page } from "@playwright/test";
import { extractStringEnvVar } from "../environment-variables";

export class LoginPage {
    private readonly _page: Page;
    private readonly _emailInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _signInButton: Locator;

    constructor(page: Page) {
        this._page = page;
        this._emailInput = this._page.locator('#field-email');
        this._passwordInput = this._page.locator('#field-password');
        this._signInButton = this._page.locator('#submit-login');
    }

    async navigateTo() {
        await this._page.goto('login')
    }

    async login() {
        await this._emailInput.fill(extractStringEnvVar('PLAYWRIGHT_VALORI_EMAIL'));
        await this._passwordInput.fill(extractStringEnvVar('PLAYWRIGHT_VALORI_PASSWORD'));
        await this._signInButton.click();
    }
}
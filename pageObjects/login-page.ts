import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly _emailInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _signInButton: Locator;

    constructor(private readonly _page: Page) {
        this._emailInput = this._page.locator('#field-email');
        this._passwordInput = this._page.locator('#field-password');
        this._signInButton = this._page.locator('#submit-login');
    }

    async navigateTo() {
        await this._page.goto("aanmelden")
    }

    async login() {
        const email = process.env.PLAYWRIGHT_VALORI_EMAIL;
        if (!email) {
            throw new Error("Missing PLAYWRIGHT_VALORI_EMAIL environment variable");
        }
        const password = process.env.PLAYWRIGHT_VALORI_PASSWORD;
        if (!password) {
            throw new Error("Missing PLAYWRIGHT_VALORI_PASSWORD environment variable");
        }

        await this._emailInput.fill(email);
        await this._passwordInput.fill(password);
        await this._signInButton.click();
    }
}
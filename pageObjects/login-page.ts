import { expect, type Locator, type Page } from '@playwright/test';
import { Username } from '../enums/username';

export class LoginPage {
    private readonly _page: Page;
    private readonly _usernameInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _loginButton: Locator;
    private readonly _errorMessage: Locator;

    constructor(page: Page) {
        this._page = page;
        this._usernameInput = page.locator('#user-name');
        this._passwordInput = page.locator('#password');
        this._loginButton = page.locator('#login-button');
        this._errorMessage = page.locator('h3[data-test="error"]');
    }

    async goto() {
        await this._page.goto('');
    }

    async loginWithUser(username: Username) {
        await this.enterUsername(username.toString());
        await this.enterPassword('secret_sauce');
        await this.clickLoginButton();
    }

    async enterUsername(username: string) {
        await this._usernameInput.fill(username.toString());
    }

    async enterPassword(password: string) {
        await this._passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this._loginButton.click();
    }

    async assertLoginHasError(hasError: boolean, message?: string) {
        await this.assertClassHasError(this._usernameInput, hasError);
        await this.assertClassHasError(this._passwordInput, hasError);

        await this.assertErrorMessage(hasError, message);
    }

    private async assertClassHasError(locator: Locator, hasError: boolean) {
        const errorClass = /\serror/;

        if (hasError) {
            await expect(locator).toHaveClass(errorClass)
        }
        else {
            await expect(locator).not.toHaveClass(errorClass)
        }
    }

    private async assertErrorMessage(hasError: boolean, message?: string) {
        if (hasError) {
            await expect(this._errorMessage).toHaveText(message!);
        }
        else {
            await expect(this._errorMessage).not.toBeVisible();
        }
    }
}
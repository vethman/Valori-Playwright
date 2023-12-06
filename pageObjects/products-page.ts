import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage {
    private readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    async goto() {
        await this._page.goto('inventory.html')
    }

    async addToCart(name: string) {
        await this.getInventoryItemLocatorByName(name).locator('button', { hasText: 'Add to cart' }).click();
    }

    async removeFromCart(name: string) {
        await this.getInventoryItemLocatorByName(name).locator('button', { hasText: 'Remove' }).click();
    }

    async assertInventoryItemPrice(name: string, price: string) {
        await expect(this.getInventoryItemLocatorByName(name).locator('.inventory_item_price')).toHaveText(price);
    }

    private getInventoryItemLocatorByName(name: string) : Locator {
        return this._page.locator('.inventory_item', { has: this._page.locator('.inventory_item_name', { hasText: name }) });
    }
}
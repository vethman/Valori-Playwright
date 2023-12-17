import { Locator, Page, expect } from "@playwright/test";

export class ShoppingCartPage {
    private readonly _page: Page;
    
    private readonly _cartItem: Locator;

    constructor(page: Page) {
        this._page = page;
        this._cartItem = page.locator('.cart_item');
    }

    async clickRemoveButton(name: string) {
        await this.getCartItemByName(name).getByRole('button', { name: 'Remove' }).click();
    }

    async assertHasProductWithName(name: string) {
        await expect(this.getCartItemByName(name)).toBeVisible();
    }

    async assertHasProductWithPrice(name: string, price: string) {
        await expect(this.getCartItemByName(name).locator('.inventory_item_price')).toHaveText(price);
    }

    async assertNumberOfItemsInShoppingCart(numberOfItems: number) {
        await expect(this._cartItem).toHaveCount(numberOfItems);
    }

    private getCartItemByName(name: string) : Locator {
        return this._cartItem.filter({ has: this._page.locator('.inventory_item_name', { hasText: name }) });
    }
}
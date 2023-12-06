import { Locator, Page, expect } from "@playwright/test";

export class ShoppingCartPage {
    private readonly _page: Page;
    private readonly _shoppingCartIcon: Locator;
    private readonly _shoppingCartIconLink: Locator;
    private readonly _cartItem: Locator;

    constructor(page: Page) {
        this._page = page;
        this._shoppingCartIcon = page.locator('#shopping_cart_container');
        this._shoppingCartIconLink = this._shoppingCartIcon.locator('.shopping_cart_link');
        this._cartItem = page.locator('.cart_item');
    }

    async clickShoppingCartIcon() {
        await this._shoppingCartIconLink.click();
        await expect(this._page).toHaveURL(/.*cart.html/);
    }

    async clickRemoveButton(name: string) {
        await this.getCartItemByName(name).locator('button:text-is("Remove")').click();
    }

    async assertNumberOfItemsInShoppingCartIcon(numberOfItems: number) {
        const expectedNumberOfItems = numberOfItems != 0 ? numberOfItems.toString() : '';
        
        await expect(this._shoppingCartIcon).toHaveText(expectedNumberOfItems);
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
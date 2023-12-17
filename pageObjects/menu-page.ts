import { Locator, Page, expect } from "@playwright/test";

export class MenuPage {
    private readonly _page: Page;
    private readonly _menuBurgerButton: Locator;
    private readonly _allItemsLink: Locator;
    private readonly _shoppingCartIcon: Locator;
    private readonly _shoppingCartIconLink: Locator;

    constructor(page: Page) {
        this._page = page;
        this._menuBurgerButton = page.locator('#react-burger-menu-btn');
        this._allItemsLink = page.getByRole('link', { name: 'All Items' });
        this._shoppingCartIcon = page.locator('#shopping_cart_container');
        this._shoppingCartIconLink = this._shoppingCartIcon.locator('.shopping_cart_link');
    }

    async navigateToInventory() {
        await this._menuBurgerButton.click();
        await this._allItemsLink.click();
    }

    async clickShoppingCartIcon() {
        await this._shoppingCartIconLink.click();
        await expect(this._page).toHaveURL(/.*cart.html/);
    }

    async assertNumberOfItemsInShoppingCartIcon(numberOfItems: number) {
        const expectedNumberOfItems = numberOfItems != 0 ? numberOfItems.toString() : '';
        
        await expect(this._shoppingCartIcon).toHaveText(expectedNumberOfItems);
    }
}
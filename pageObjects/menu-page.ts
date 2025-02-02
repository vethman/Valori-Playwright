import { Locator, Page, expect } from "@playwright/test";
import { MenuSubItem } from "../enums/MenuSubItem";
import { MenuItem } from "../enums/MenuItem";

export class MenuPage {
    private readonly _topMenu: Locator;
    private readonly _menuItemsWithSubItems: Map<MenuSubItem, MenuItem> = new Map<MenuSubItem, MenuItem>;

    constructor(private readonly _page: Page) {
        this._topMenu = _page.locator('#top-menu');

        this._menuItemsWithSubItems.set(MenuSubItem.Clothes_Men, MenuItem.Clothes);
        this._menuItemsWithSubItems.set(MenuSubItem.Clothes_Women, MenuItem.Clothes);
        this._menuItemsWithSubItems.set(MenuSubItem.Accessories_Stationery, MenuItem.Accessories);
        this._menuItemsWithSubItems.set(MenuSubItem.Accessories_HomeAccessories, MenuItem.Accessories);
    }

    async navigateTo() {
        await this._page.goto('');
    }

    async navigateToByMenu(menu: MenuItem) {
        await this._topMenu.getByRole('link', { name: menu.toString(), exact: true }).click();
    }

    async navigateToBySubMenu(menuSub: MenuSubItem) {
        const menu = this._menuItemsWithSubItems.get(menuSub)!;

        await this._topMenu.getByRole('link', { name: menu.toString(), exact: true }).hover();
        await this._topMenu.getByRole('link', { name: menuSub.toString(), exact: true }).click();
    }

    async assertUrlAndTitleMenu(menu: MenuItem) {
        switch (menu) {
            case MenuItem.Clothes:
                await expect(this._page).toHaveURL(/.*\/3-clothes/);
                break;
            case MenuItem.Accessories:
                await expect(this._page).toHaveURL(/.*\/6-accessories/);
                break;
            case MenuItem.Art:
                await expect(this._page).toHaveURL(/.*\/9-art/);
                break;
            default:
                break;
        }
        
        await expect(this._page).toHaveTitle(menu.toString());
    }

    async assertUrlAndTitleSubMenu(menuSub: MenuSubItem) {
        switch (menuSub) {
            case MenuSubItem.Clothes_Men:
                await expect(this._page).toHaveURL(/.*\/4-men/);
                break;
            case MenuSubItem.Clothes_Women:
                await expect(this._page).toHaveURL(/.*\/5-women/);
                break;
            case MenuSubItem.Accessories_Stationery:
                await expect(this._page).toHaveURL(/.*\/7-stationery/);
                break;
            case MenuSubItem.Accessories_HomeAccessories:
                await expect(this._page).toHaveURL(/.*\/8-home-accessories/);
                break;
            default:
                break;
        }
        
        await expect(this._page).toHaveTitle(menuSub.toString());
    }
}
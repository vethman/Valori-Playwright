import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/login-page';
import { ProductsPage } from '../pageObjects/products-page';
import { ShoppingCartPage } from '../pageObjects/shopping-cart-page';
import { MenuPage } from '../pageObjects/menu-page';

type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    shoppingCartPage: ShoppingCartPage;
    menuPage: MenuPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    menuPage: async ({ page }, use) => {
        await use(new MenuPage(page));
    }
});
export { expect } from '@playwright/test';
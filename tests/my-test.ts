import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/login-page';
import { ProductsPage } from '../pageObjects/products-page';
import { ShoppingCartPage } from '../pageObjects/shopping-cart-page';

type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    shoppingCartPage: ShoppingCartPage;
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
});
export { expect } from '@playwright/test';
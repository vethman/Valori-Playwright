import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './my-test';

test('Home should show number of products per group', async ({ homePage }) => {
    await homePage.navigateTo();

    await homePage.productsPopular.assertNumberOfProducts(8);
    await homePage.productsOnSale.assertNumberOfProducts(2);
    await homePage.productsNew.assertNumberOfProducts(8);
});

test('Home Hummingbird - Vector Graphics New Products should have price...', async ({ homePage }) => {
    await homePage.navigateTo();

    await homePage.productsNew.assertProductPrice('Hummingbird - Vector Graphics', '€ 10.89');
});

test('Home accessibility testing', async ({ page, homePage }) => {
    await homePage.navigateTo();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});
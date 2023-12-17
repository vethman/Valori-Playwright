import { test } from './my-test';
import { Username } from '../enums/username';
import { Product } from '../enums/product';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginWithUser(Username.Standard);
});

test('toevoegen/verwijderen item update aantal in winkelwagen', async ({ productsPage, menuPage }) => {
  await productsPage.goto();

  await menuPage.assertNumberOfItemsInShoppingCartIcon(0);

  await productsPage.addToCart(Product.SauceLabsBackpack);
  await menuPage.assertNumberOfItemsInShoppingCartIcon(1);

  await productsPage.addToCart(Product.SauceLabsOnesie);
  await menuPage.assertNumberOfItemsInShoppingCartIcon(2);

  await productsPage.removeFromCart(Product.SauceLabsOnesie);
  await menuPage.assertNumberOfItemsInShoppingCartIcon(1);

  await productsPage.removeFromCart(Product.SauceLabsBackpack);
  await menuPage.assertNumberOfItemsInShoppingCartIcon(0);
});

import { test } from './my-test';
import { Username } from '../enums/username';
import { Product } from '../enums/product';

test.beforeEach(async ({ loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.loginWithUser(Username.Standard);
});

test('toevoegen/verwijderen item update aantal in winkelwagen', async ({ shoppingCartPage, productsPage }) => {
  await productsPage.goto();

  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(0);

  await productsPage.addToCart(Product.SauceLabsBackpack);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(1);

  await productsPage.addToCart(Product.SauceLabsOnesie);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(2);

  await productsPage.removeFromCart(Product.SauceLabsOnesie);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(1);

  await productsPage.removeFromCart(Product.SauceLabsBackpack);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(0);
});

import { test } from './my-test';
import { Username } from '../enums/username';
import { Product } from '../enums/product';

test.beforeEach(async ({ loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.loginWithUser(Username.Standard);
  await productsPage.goto();
});

test('toevoegen en verwijderen via shopping cart', async ({ shoppingCartPage, productsPage }) => {
  await productsPage.addToCart(Product.SauceLabsBackpack);
  await productsPage.addToCart(Product.SauceLabsOnesie);
  await productsPage.addToCart(Product.SauceLabsBikeLight);
  await productsPage.addToCart(Product.SauceLabsBoltTShirt);
  await productsPage.addToCart(Product.SauceLabsFleeceJacket);
    
  await shoppingCartPage.clickShoppingCartIcon();
  await shoppingCartPage.assertNumberOfItemsInShoppingCart(5);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(5);

  await shoppingCartPage.clickRemoveButton(Product.SauceLabsFleeceJacket);
  await shoppingCartPage.clickRemoveButton(Product.SauceLabsBoltTShirt);
  await shoppingCartPage.clickRemoveButton(Product.SauceLabsBikeLight);
  await shoppingCartPage.clickRemoveButton(Product.SauceLabsOnesie);
  await shoppingCartPage.clickRemoveButton(Product.SauceLabsBackpack);

  await shoppingCartPage.assertNumberOfItemsInShoppingCart(0);
  await shoppingCartPage.assertNumberOfItemsInShoppingCartIcon(0);
});

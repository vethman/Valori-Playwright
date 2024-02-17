import { MenuItem } from '../enums/MenuItem';
import { MenuSubItem } from '../enums/MenuSubItem';
import { test } from './my-test';

test('Menu should navigate to the correct pages', async ({ menuPage }) => {
    await menuPage.navigateTo();
    
    await menuPage.navigateToByMenu(MenuItem.Clothes);
    await menuPage.assertUrlAndTitleMenu(MenuItem.Clothes);

    await menuPage.navigateToByMenu(MenuItem.Accessories);
    await menuPage.assertUrlAndTitleMenu(MenuItem.Accessories);

    await menuPage.navigateToByMenu(MenuItem.Art);
    await menuPage.assertUrlAndTitleMenu(MenuItem.Art);

    await menuPage.navigateToBySubMenu(MenuSubItem.Clothes_Men);
    await menuPage.assertUrlAndTitleSubMenu(MenuSubItem.Clothes_Men);

    await menuPage.navigateToBySubMenu(MenuSubItem.Clothes_Women);
    await menuPage.assertUrlAndTitleSubMenu(MenuSubItem.Clothes_Women);

    await menuPage.navigateToBySubMenu(MenuSubItem.Accessories_Stationery);
    await menuPage.assertUrlAndTitleSubMenu(MenuSubItem.Accessories_Stationery);

    await menuPage.navigateToBySubMenu(MenuSubItem.Accessories_HomeAccessories);
    await menuPage.assertUrlAndTitleSubMenu(MenuSubItem.Accessories_HomeAccessories);
});

import { test } from './my-test';

test('input velden niet/verkeerd vullen resulteert in errors bij inloggen', async ({ loginPage }) => {
  await loginPage.goto();

  await loginPage.assertLoginHasError(false);

  await loginPage.clickLoginButton();
  await loginPage.assertLoginHasError(true, 'Epic sadface: Username is required');

  await loginPage.enterUsername('Not a valid username');
  await loginPage.clickLoginButton();
  await loginPage.assertLoginHasError(true, 'Epic sadface: Password is required');

  await loginPage.enterPassword('Not a valid password');
  await loginPage.clickLoginButton();
  await loginPage.assertLoginHasError(true, 'Epic sadface: Username and password do not match any user in this service');
});

import { test } from './my-test';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('input velden niet vullen resulteert in errors bij inloggen', async ({ loginPage }) => {
  await loginPage.assertUsernameInputHasError(false);
  await loginPage.assertPasswordInputHasError(false);
  await loginPage.assertErrorMessage(false);

  await loginPage.clickLoginButton();
  await loginPage.assertUsernameInputHasError(true);
  await loginPage.assertPasswordInputHasError(true);
  await loginPage.assertErrorMessage(true, 'Epic sadface: Username is required');

  await loginPage.enterUsername('Not a valid username');
  await loginPage.clickLoginButton();
  await loginPage.assertUsernameInputHasError(true);
  await loginPage.assertPasswordInputHasError(true);
  await loginPage.assertErrorMessage(true, 'Epic sadface: Password is required');

  await loginPage.enterPassword('Not a valid password');
  await loginPage.clickLoginButton();
  await loginPage.assertUsernameInputHasError(true);
  await loginPage.assertPasswordInputHasError(true);
  await loginPage.assertErrorMessage(true, 'Epic sadface: Username and password do not match any user in this service');
});

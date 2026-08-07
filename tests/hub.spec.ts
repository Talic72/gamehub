import { test, expect } from '@playwright/test';

test('loads landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('GameHub')).toBeVisible();
});

test('captures player name', async ({ page }) => {
  await page.goto('/');

  await page
    .getByPlaceholder('Enter your name')
    .fill('Ethan');

  await expect(
    page.getByDisplayValue('Ethan')
  ).toBeVisible();
});

test('navigates to Tic Tac Toe and back', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('button', { name: 'Tic Tac Toe' })
    .click();

  await expect(
    page.getByText('Tic Tac Toe')
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Back to Hub' })
    .click();

  await expect(
    page.getByText('GameHub')
  ).toBeVisible();
});

test('navigates to Treasure Hunt', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('button', { name: 'Play' })
    .click();

  await expect(
    page.getByText('Treasure Hunt')
  ).toBeVisible();
});
import { test, expect } from '@playwright/test';

test('loads Treasure Hunt', async ({ page }) => {
  await page.goto('/treasure');

  await expect(
    page.getByText('Treasure Hunt')
  ).toBeVisible();
});

test('creates a room', async ({ page }) => {
  await page.goto('/treasure');

  await page
    .getByRole('button', { name: 'Create Room' })
    .click();

  await expect(
    page.getByText('Room:')
  ).toBeVisible();
});

test('host can hide treasure', async ({ page }) => {
  await page.goto('/treasure');

  await page
    .getByRole('button', { name: 'Create Room' })
    .click();

  const buttons = page.getByRole('button');

  await buttons.nth(1).click();

  await expect(
    page.getByText('Waiting')
  ).toBeVisible();
});
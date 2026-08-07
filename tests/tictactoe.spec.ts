import { test, expect } from '@playwright/test';

test('loads tic tac toe', async ({ page }) => {
  await page.goto('/tictactoe');

  await expect(
    page.getByText('Tic Tac Toe')
  ).toBeVisible();
});

test('allows player to make a move', async ({ page }) => {
  await page.goto('/tictactoe');

  const squares = page.getByRole('button');

  await squares.nth(0).click();

  await expect(squares.nth(0)).toHaveText('X');
});

test('reset returns board to initial state', async ({ page }) => {
  await page.goto('/tictactoe');

  const squares = page.getByRole('button');

  await squares.nth(0).click();

  await page
    .getByRole('button', { name: 'Reset Game' })
    .click();

  await expect(squares.nth(0)).toHaveText('');
});
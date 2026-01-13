import { test, expect } from "@playwright/test";

test("Happy path: experiência -> carrinho -> login -> Stripe -> sucesso", async ({ page }) => {
  const email = process.env.E2E_USER_EMAIL!;
  const password = process.env.E2E_USER_PASSWORD!;
  expect(email, "Defina E2E_USER_EMAIL").toBeTruthy();
  expect(password, "Defina E2E_USER_PASSWORD").toBeTruthy();

  // Acessa Home
  await page.goto("/#/");
  await expect(page).toHaveTitle(/buyship/i);

  // Navega para Experiências
  const navExp = page.getByTestId("nav-experiences");
  if (await navExp.count()) {
    await navExp.click();
  } else {
    await page.getByRole("link", { name: /experien/i }).click();
  }

  await expect(page).toHaveURL(/#\/experiences/i);

  // Escolhe a "Experiência Orbital Premium"
  const expCard = page.getByTestId("experience-orbital-premium");
  if (await expCard.count()) {
    await expCard.click();
  } else {
    await page.getByText(/Experiência Orbital Premium▪/i).first().click();
  }

  await expect(page).toHaveURL(/#\/experiences\//i);
  await expect(page.getByText(/Experiência Orbital Premium▪/i)).toBeVisible();

  // Reservar agora - Adiciona no carrinho e muda pra pagina cart
  const reserveBtn = page.getByTestId("reserve-now");
  if (await reserveBtn.count()) {
    await reserveBtn.click();
  } else {
    await page.getByRole("button", { name: /reservar agora/i }).click();
  }

  await expect(page).toHaveURL(/#\/cart/i);

  // Verifica se tem item no carrinho
  const cartTitle = page.getByTestId("cart-item-title");
  if (await cartTitle.count()) {
    await expect(cartTitle).toContainText(/Orbital Premium/i);
  } else {
    await expect(page.getByText(/Experiência Orbital Premium/i)).toBeVisible();
  }

  // Abre modal pra fazer login
  const loginBtn = page.getByTestId("cart-login");
  if (await loginBtn.count()) {
    await loginBtn.click();
  } else {
    await page.getByRole("button", { name: /entrar na conta/i }).click();
  }

  // Preencher modal e faz login
  const emailInput = page.getByTestId("auth-email");
  const passInput = page.getByTestId("auth-password");

  if (await emailInput.count()) {
    await emailInput.fill(email);
    await passInput.fill(password);
    await page.getByTestId("auth-submit").click();
  } else {
    await page.getByPlaceholder(/email/i).fill(email);
    await page.getByPlaceholder(/senha/i).fill(password);
    await page.getByRole("button", { name: /^entrar$/i }).click();
  }

  // Após logar, aparece o CTA "Finalizar compra"
  const checkoutBtn = page.getByTestId("checkout-primary");
  if (await checkoutBtn.count()) {
    await expect(checkoutBtn).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: /finalizar compra/i })).toBeVisible();
  }

  // Clica para abrir Stripe e fazer o pagamento
  if (await checkoutBtn.count()) {
    await checkoutBtn.click();
  } else {
    await page.getByRole("button", { name: /finalizar compra/i }).click();
  }

  // Muda pra pagina do stripe
  await page.waitForURL(/https:\/\/checkout\.stripe\.com\//i, { timeout: 60_000 });

  // Preenche o cartão de teste e paga o stripe
  const cardNumberFrame = page
    .frameLocator('iframe[name^="__privateStripeFrame"]')
    .locator('input[name="cardnumber"]');

  if (await cardNumberFrame.count()) {
    await cardNumberFrame.fill("4242424242424242");
    await page
      .frameLocator('iframe[name^="__privateStripeFrame"]')
      .locator('input[name="exp-date"]')
      .fill("1234");
    await page
      .frameLocator('iframe[name^="__privateStripeFrame"]')
      .locator('input[name="cvc"]')
      .fill("123");
  } else {
    await page.getByPlaceholder(/1234 1234 1234 1234/i).fill("4242424242424242");
    await page.getByPlaceholder(/MM \/ YY/i).fill("12 / 34");
    await page.getByPlaceholder(/CVC/i).fill("123");
  }
  const nameInput = page.getByLabel(/name/i);
  if (await nameInput.count()) await nameInput.fill("Guilherme Farias");

  // Confirma pagamento do stripe
  const payBtn = page.getByRole("button", { name: /pay|pagar|confirm/i });
  await expect(payBtn).toBeEnabled();
  await payBtn.click();

  // Volta para a página de sucesso BuyShip
  await page.waitForURL(/#\/checkoutSuccess/i, { timeout: 60_000 });

  // Valida pagina de sucesso
  await expect(page.getByText(/Compra confirmada▪/i)).toBeVisible();
});
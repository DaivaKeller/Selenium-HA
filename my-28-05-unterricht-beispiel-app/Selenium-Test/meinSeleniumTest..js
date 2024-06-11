const { Builder, By, until } = require("selenium-webdriver");
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');

let driver;

describe('Selenium Test', () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  }, 3000);

  afterAll(async () => {
    await driver.quit();
  }, 3000);

  it('findet die Inputfelder und den Button, trägt Daten ein und klickt auf den Button', async () => {
    await driver.get("http://localhost:3000");

    const title = await driver.getTitle();
    expect(title).toBe("React App");

    const nameInput = await driver.findElement(By.name("name"));
    const emailInput = await driver.findElement(By.name("email"));
    const buttonElement = await driver.findElement(By.tagName("button"));

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(buttonElement).toBeDefined();

    await nameInput.sendKeys("Daiva");
    await emailInput.sendKeys("http://localhost:3000");
    await buttonElement.click();

    const button = await driver.findElement(By.tagName("button"));
    const checkboxElement = await driver.findElement(By.id("checkbox"));

    const oldClass = await button.getAttribute("class");
    expect(oldClass).toBe("rot");

    await button.click();
    await checkboxElement.click();

    const newClass = await button.getAttribute("class");
    expect(newClass).toBe("grau");
  });
});

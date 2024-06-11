const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
  // Set up the WebDriver (hier wird der ChromeDriver verwendet)
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Öffne Wikipedia
    await driver.get('https://www.wikipedia.org/');
    
    // Finde das Suchfeld
    let searchField = await driver.findElement(By.name('search'));
    
    // Gib den Suchbegriff ein
    let searchTerm = 'Python (Programmiersprache)';
    await searchField.sendKeys(searchTerm);
    
    // Sende die Suche ab
    await searchField.sendKeys(Key.RETURN);
    
    // Warte ein wenig, damit die Ergebnisse geladen werden können
    await driver.sleep(3000);
    
    // Klicke auf den Link des ersten Suchergebnisses
    let firstResult = await driver.findElement(By.css("a[title='Python (Programmiersprache)']"));
    await firstResult.click();
    
    // Warte erneut, damit die neue Seite geladen werden kann
    await driver.sleep(3000);
    
    // Überprüfen, ob die richtige Seite geladen wurde
    let title = await driver.getTitle();
    assert(title.includes('Python (Programmiersprache)'), 'Test fehlgeschlagen: Die Seite wurde nicht korrekt geladen.');
    console.log('Test erfolgreich: Die Seite wurde korrekt geladen.');
    
  } finally {
    // Schließe den Browser
    await driver.quit();
  }
})();

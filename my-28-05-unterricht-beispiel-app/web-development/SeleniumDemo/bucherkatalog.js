const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

// Funktion zum Scrapen der Buchdaten von der aktuellen Seite
async function scrapePage(driver) {
    let books = [];
    let bookContainers = await driver.findElements(By.className('product_pod'));

    for (let container of bookContainers) {
        let title = await container.findElement(By.tagName('h3')).findElement(By.tagName('a')).getAttribute('title');
        let price = await container.findElement(By.className('price_color')).getText();
        let availability = await container.findElement(By.className('availability')).getText();
        books.push({
            title: title,
            price: price,
            availability: availability.trim()
        });
    }

    return books;
}

async function scrapeBooksToScrape() {
    let driver = await new Builder().forBrowser('chrome').build();
    let allBooks = [];

    try {
        await driver.get('http://books.toscrape.com');

        while (true) {
            let booksOnPage = await scrapePage(driver);
            allBooks = allBooks.concat(booksOnPage);

            try {
                let nextButton = await driver.findElement(By.className('next'));
                await nextButton.findElement(By.tagName('a')).click();
                await driver.wait(until.elementLocated(By.className('product_pod')), 10000);
            } catch (error) {
                break; // Keine nächste Seite mehr vorhanden
            }
        }
    } finally {
        await driver.quit();
    }

    // Speichern der Daten in einer CSV-Datei
    const csvPath = path.join(__dirname, 'books.csv');
    const csvContent = allBooks.map(book => `${book.title},${book.price},${book.availability}`).join('\n');
    fs.writeFileSync(csvPath, 'Title,Price,Availability\n' + csvContent, 'utf-8');
    console.log('Scraping abgeschlossen. Daten sind in books.csv gespeichert.');
}

scrapeBooksToScrape();



